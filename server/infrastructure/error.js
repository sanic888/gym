function Error(errors){
  this.errors = errors || [];
}

Error.prototype.addError = function(field, message, code){
  this.errors.push({
    param: field,
    msg: message,
    code: code
  })
};

Error.prototype.hasErrors = function(){
  return this.errors.length > 0;
};

module.exports = Error;