var settings = require('./settings/config.json');
var private_settings = require('./../private_config/config.json');

module.exports = {
  mongo: settings.mongo,
  secrets: settings.secrets,
  gmail: private_settings.gmail
};
