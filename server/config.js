var settings = require('./settings/config.json');

module.exports = {
  mongo: settings.mongo,
  secrets: settings.secrets
};
