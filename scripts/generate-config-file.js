var fs = require('fs');
var mkdirp = require('mkdirp');

if (!process.env.ENV_TYPE) {
  throw new Error('No ENV_TYPE');
}

if (!process.env.FACEBOOK_APP_ID) {
  throw new Error('No FACEBOOK_APP_ID');
}

if (!process.env.APP_ID) {
  throw new Error('No APP_ID');
}

if (!process.env.SERVER_URL) {
  throw new Error('No SERVER_URL');
}

var isProduction = process.env.ENV_TYPE === 'PROD';
const configFilePath = 'src/environments';

mkdirp(configFilePath, function (err) {
  if (err) {
    throw err;
  }

  var confFile = "export const environment = {\n" +
    "  production: " + isProduction + ",\n" +
    "  facebookAppId: '" + process.env.FACEBOOK_APP_ID + "',\n" +
    "  parseAppId: '" + process.env.APP_ID + "',\n" +
    "  parseUrl: '" + process.env.SERVER_URL + "'\n" +
    "};";

  fs.writeFile(configFilePath + '/environment.' + process.env.ENV_TYPE + '.ts', confFile, function (err) {
    if (err) {
      throw err;
    }

    fs.writeFile(configFilePath + '/environment.DEV.ts', confFile, function (err) {
      console.log(confFile);
    })
  });
});
