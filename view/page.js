function render(request, response) {
  var content = '';
  content = '<body>';
  if (request.method == 'POST') {
    content += '<p>Search query: ' + request.post.query + '</p>';
  } 
  content +=
    '<form method="post">' +
    '  <input type="text" name="query" id="query" value="default"/>' +
    '  <input type="submit" value="Search"/>' +
    '</form></body>';

  response.write(content);
}

exports.render = render;
