var page = require('webpage').create();
var document;
var url = 'http://google.com';

console.log('Opening: ' + url);
page.open(url, function (status) {
  var err = 1;
  console.log('Opened page status: ' + status);
  if (status === 'success') {
    err = 0;
    var title = page.evaluate(function () {
      return document.title;
    });
    console.log('Loaded: ' + title);
  }
  phantom.exit(err);
});
