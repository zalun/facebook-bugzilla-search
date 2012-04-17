var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(server_name) {
  function onRequest(request, response) {
    request.setEncoding("utf8");
    request.post_string = '';
    // receiving data from POST
    if (request.method == 'POST') {
      request.post = null;
    }
    request.addListener("data", function(chunk) {
      request.post_string += chunk;
    });
    request.addListener("end", function() {
      request.post = querystring.decode(request.post_string);
    });
 
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/') pathname = '/home';
    if (pathname.charAt(0) == '/') pathname = pathname.substr(1);

    try {
      var view = require('./view/' + pathname);
    }
    catch (exception) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("No such page");
    }
    request.addListener("end", function() {
      try {
        view.render(request, response);
      } catch (exception) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write("Server Error");
      }
      response.end();
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log(server_name + " server has started.");
}

exports.start = start;
