(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['complete_registration.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div>\r\n  <h1>Welcome to Sport!</h1>\r\n</div>\r\n\r\n<hr>\r\n\r\n<p>\r\n	Thanks for signing up! To verify your email address and to complete your registration, <a href=\""
    + escapeExpression(((helper = (helper = helpers.verifyUrl || (depth0 != null ? depth0.verifyUrl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"verifyUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">click here.</a>\r\n</p>";
},"useData":true});
})();