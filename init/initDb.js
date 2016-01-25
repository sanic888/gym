var mongo = require('./../server/mongo');
var BaseDataService = require('./../server/infrastructure/baseDataService');
var userService = new BaseDataService(mongo.read.Users);
var bcrypt = require('bcryptjs');
var Q = require('q');

var getHash = function(text){
	var deferred = Q.defer();
	if(!text){
		deferred.resolve('');
	} else {
		bcrypt.hash(text, 10, function(err, hash) {
			if(err){
				deferred.reject(err);
			} else {
				deferred.resolve(hash);
			}
		});
	}

	return deferred.promise;
};

userService.remove().then(function(){
	getHash('111').then(function(hash){
		userService.insert({email: 'sa@sa.com', password: hash}).then(function(){
			console.log('success');
		}).catch(function(){
			console.log('error');
		}).finally(function(){
			process.exit();
		});
	});
});
