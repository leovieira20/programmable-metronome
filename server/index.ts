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

const applicationPort = process.env.PARSE_SERVER_PORT || process.env.PORT || 8080;

const api = new ParseServer({
  cloud: __dirname + '/cloud-functions/main.js',
  databaseURI: process.env.DB_URL,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});

app.use(express.static(__dirname + '/client'));
app.use('/parse', api);

app.listen(applicationPort, (err) => {
  if (err) {
    throw err;
  }

  console.log(`'parse running on port ${applicationPort}.`);
});
