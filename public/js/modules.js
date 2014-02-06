require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"s23DI6":[function(require,module,exports){
exports.alert = function(msg) {
  if (msg == null) {
    msg = 'Noooo';
  }
  console.log("core: " + msg + " !!!!!!");
  return alert("core: " + msg + " !!!!!!!");
};

},{}],"core":[function(require,module,exports){
module.exports=require('s23DI6');
},{}],3:[function(require,module,exports){
module.exports=require("s23DI6")
},{}],"ba2Xsz":[function(require,module,exports){
exports.test = function() {
  console.log("util: test");
  return "test";
};

},{}],"util":[function(require,module,exports){
module.exports=require('ba2Xsz');
},{}]},{},[3])
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"s23DI6":[function(require,module,exports){
exports.alert = function(msg) {
  if (msg == null) {
    msg = 'Noooo';
  }
  console.log("core: " + msg + " !!!!!!");
  return alert("core: " + msg + " !!!!!!!");
};

},{}],"core":[function(require,module,exports){
module.exports=require('s23DI6');
},{}],3:[function(require,module,exports){
exports.test = function() {
  console.log("util: test");
  return "test";
};

},{}],"ba2Xsz":[function(require,module,exports){
module.exports=require(3)
},{}],"util":[function(require,module,exports){
module.exports=require('ba2Xsz');
},{}]},{},[3])