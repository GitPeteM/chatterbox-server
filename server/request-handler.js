const storage = require('./storage.js');

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var exData = [{message: 'hi'}, {message: 'message 2'}, {message: 'last message'}];

var requestHandler = function(request, response) {

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // The outgoing status.

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Hello, World!');

  // if statement depending on http request
  // 200 - Everything is OK
  // 201 - Created Successfully
  // 202 - Accepted
  // 204 - No Content
  // 301 - Moved Permanently
  // 400 - Bad Request
  // 401 - Unauthorized
  // 404 - Not Found
  // 500 - Internal Server Error
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode = 404;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (request.url.includes('/classes/messages')) {
    if (request.method === 'GET') {
      // grab all current messages
      statusCode = 200;
      response.writeHead(statusCode, headers);
      console.log(storage.getData());
      response.end(JSON.stringify(storage.getData()));
    } else if (request.method === 'POST') {
      //Add message to data structure
      //send message data to storage.js
      // return a success code?
      //  https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
      let data = '';
      request.on('data', chunk => {
        data += chunk;
      });

      request.on('end', () => {
        statusCode = 201;
        console.log(data);
        storage.addData(JSON.parse(data));

        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(data));
      });
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end();
    } else {
      statusCode = 400;
      response.writeHead(statusCode, headers);
      response.end('Invalid Method');
    }
  } else {
    response.writeHead(statusCode, headers);
    response.end('Invalid Endpoint');
  }
};

module.exports.requestHandler = requestHandler;