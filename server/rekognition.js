const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;
AWS.config.update({ region: 'eu-west-1' });

module.exports = new AWS.Rekognition();
