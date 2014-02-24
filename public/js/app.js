
/*global Handlebars */

/*global mainJade */
console.log('app.js');

$(function() {
  var locale;
  console.log('$');
  locale = false;
  console.log('Setting up locale');
  return $.getJSON('api/locale', function(data) {
    var core, mainHbr, util;
    locale = data;
    data = {
      name: locale.global.title,
      description: locale.global.description
    };
    console.log('Replacing #mainJade with jade main template');
    $('#mainJade').html(mainJade(data));
    console.log('Reading main template');
    mainHbr = Handlebars.templates['mainHbr'];
    console.log('Replacing html for #mainHbr');
    $('#mainHbr').html(mainHbr(data));
    util = require('util');
    console.log('app: ' + util.test());
    core = require('core');
    return core.alert(locale.global.title);
  });
});
