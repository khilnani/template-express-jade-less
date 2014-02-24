(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['mainHbr'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", buffer = "<h2>Handlebars</h2>\n<p>";
  stack1 = ((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n<p>";
  stack1 = ((helper = helpers.description || (depth0 && depth0.description)),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</p>\n";
},"useData":true});
})();