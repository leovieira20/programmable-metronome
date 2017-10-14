var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

if (!process.env.DB_URL) {
  console.log('No DB_URL');
}

if (!process.env.APP_ID) {
  console.log('No APP_ID');
}

if (!process.env.MASTER_KEY) {
  console.log('No MASTER_KEY');
}

var api = new ParseServer({
  databaseURI: process.env.DB_URL,
  cloud: 'cloud-functions/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.DB_URL.MASTER_KEY,
  serverURL: 'https://pgmb-metronome.herokuapp.com/parse'
});

app.use(express.static(__dirname + '/dist'));
app.use('/parse', api);

app.listen(process.env.PORT || 8080);
