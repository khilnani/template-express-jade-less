exports.alert = function(msg) {
  if (msg == null) {
    msg = 'Noooo';
  }
  return console.log("core: " + msg + " !!!!!!");
};
