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

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});

// Run the app by serving the static files
// in the dist directory
//app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port
//app.listen(process.env.PORT || 8080);
