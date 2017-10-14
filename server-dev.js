var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev',
  cloud: 'cloud-functions/main.js',
  appId: 'appId',
  masterKey: 'masterKey',
  serverURL: 'http://localhost:1337/parse'
});

app.use('/parse', api);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});
