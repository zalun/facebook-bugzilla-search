
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', {title: 'FB App'});
};

exports.canvas = function(req, res){
  res.render('canvas.html', { title: 'Search Bugzilla' });
};
