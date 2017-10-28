const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

if (!process.env.DB_URL) {
  throw new Error('No DB_URL');
}

if (!process.env.APP_ID) {
  throw new Error('No APP_ID');
}

if (!process.env.MASTER_KEY) {
  throw new Error('No MASTER_KEY');
}

const api = new ParseServer({
  cloud: __dirname + '/cloud-functions/main.js',
  databaseURI: process.env.DB_URL,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});

app.use(express.static(__dirname + '/dist'));
app.use('/parse', api);

app.listen(process.env.PARSE_SERVER_PORT || 8080, () => {
  console.log('parse running on port 1337.');
});
