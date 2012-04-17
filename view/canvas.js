function render(request, response) {
  var content = '';
  content = '<body>';
  content +=
    '<form method="post">' +
    '  <input type="text" name="query" id="query" value="default"/>' +
    '  <input type="submit" value="Search bugzilla"/>' +
    '</form></body>';
  if (request.method == 'POST') {
    if (request.post.query) {
      content += '<p>Search results for ' + request.post.query + '</p>';
    }
  } 

  response.write(content);
}

exports.render = render;
