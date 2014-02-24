var locale =  require('./../locale').default();

exports.index = function (req, res) {
  res.render('index', { name: locale.global.title, description: locale.global.description });
};
