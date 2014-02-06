exports.alert = function(msg) {
  if (msg == null) {
    msg = 'Noooo';
  }
  console.log("core: " + msg + " !!!!!!");
  return alert("core: " + msg + " !!!!!!!");
};
