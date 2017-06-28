// use require to import module
let http = require('http');

// call method http.createServer to create a web server
http.createServer( (request, response) => {
	// send HTTP header
	// HTTP status: 200 //ok
	// contentType: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// send response data "Hello world"
	response.end('Hello world\n');
}).listen(8888);

// terminal print info
console.log('Server runing at http://127.0.0.1:8888/');

