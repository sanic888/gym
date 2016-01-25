var mongo = require('./../server/mongo');
var BaseDataService = require('./../server/infrastructure/baseDataService');
var userService = new BaseDataService(mongo.read.Users);

module.exports.findById = function(id){
	return userService.find({_id: id});
};