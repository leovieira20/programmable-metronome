var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

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
