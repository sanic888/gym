var config = require('./config');
var mongo = require('mongoskin');

var db = {};

var name = "read";
db.read = mongo.db(config.mongo.read, {native_parser:true});

db.read.on('error', function (err) {
});

db.read.on('connected', function () {
});

db.read.on('reconnected', function () {
});

db.read.on('disconnected', function () {
});

module.exports = {
    read: {
        Users: db.read.collection('users')
    }
};
