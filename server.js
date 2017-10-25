var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

if (!process.env.DB_URL) {
  throw new Error('No DB_URL');
}

if (!process.env.APP_ID) {
  throw new Error('No APP_ID');
}

if (!process.env.MASTER_KEY) {
  throw new Error('No MASTER_KEY');
}

var api = new ParseServer({
  cloud: 'cloud-functions/main.js',
  databaseURI: process.env.DB_URL,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});

app.use(express.static(__dirname + '/dist'));
app.use('/parse', api);

app.listen(process.env.PORT || 8080);
