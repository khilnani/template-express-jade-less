
/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', { name: 'NAME', description: 'DESCRIPTION' });
};
