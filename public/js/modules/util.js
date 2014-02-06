exports.alert = function(msg) {
  if (msg == null) {
    msg = 'Noooo';
  }
  console.log("" + msg + " !!!!!!");
  return alert("" + msg + " !!!!!!!");
};
