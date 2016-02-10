var mongo = require('./../mongo');
var BaseDataService = require('./../infrastructure/baseDataService');
var userService = new BaseDataService(mongo.read.Users);

module.exports.findById = function(id){
	return userService.find({_id: id});
};

module.exports.getByEmail = function(email){
	return userService.findOne({email: email});
};

module.exports.findByToken = function(token){
	return userService.find({_id: token});
};

module.exports.create = function(user){
	return userService.insert(user);
};