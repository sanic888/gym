var Q = require('q');

var BaseDataService = function(col){
  this._col = col;
};

BaseDataService.prototype.findOne = function(query){
    return this._perform("findOne", query);
};

BaseDataService.prototype.find = function(query){
    var deferred = Q.defer();
    this._col.find(query, function(err, cursor){
        if(err){
            deferred.reject(err);
        }else{
            cursor.toArray(function(err, items){
                deferred.resolve(items);
            });
        }
    });
    return deferred.promise;
};

BaseDataService.prototype.insert = function(doc){
    return this._perform("insert", doc).then(function(data){
        return data && data.ops && data.ops[0];
    });
};

BaseDataService.prototype.save = function(doc){
    var deferred = Q.defer();
    this._col.save(doc, function(err, result, arg2){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
};

BaseDataService.prototype.findAndModify = function(query, update){
    var deferred = Q.defer();
    this._col.findAndModify(query,update, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};

BaseDataService.prototype.update = function(query, update, upsert){
    var deferred = Q.defer();
    this._col.update(query,update, {upsert: upsert || false}, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};

BaseDataService.prototype.updateDoc = function(query, updateFn){
    var deferred = Q.defer();
    var self = this;

    this.findOne(query).then(function(item){
        if(!item){
            var message = "UPDATE: Document was not found by query " + JSON.stringify(query);
            deferred.reject(new Error(message));
            return;
        }
        updateFn(item);
        return self.save(item).then(function(doc){
            deferred.resolve(doc);
        });
    })
    return deferred.promise;
};

BaseDataService.prototype._perform = function(method, query){
    var deferred = Q.defer();
    this._col[method](query, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};

BaseDataService.prototype.remove = function(query){
    return this._perform("remove", query);
};

module.exports = BaseDataService;