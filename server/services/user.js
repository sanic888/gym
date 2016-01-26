var mongo = require('./../mongo');
var BaseDataService = require('./../infrastructure/baseDataService');
var userService = new BaseDataService(mongo.read.Users);

module.exports.findById = function(id){
	return userService.find({_id: id});
};