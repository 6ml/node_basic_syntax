let http = require('http');
let url = require('url');

start = (route) => {
	onRequest = (request, response) => {
		let pathName = url.parse(request.url).pathname;
		console.log(`Request for ${pathName} received.`);

		route(pathName);

		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.write("Hello world");
		response.end();
	};

	http.createServer(onRequest).listen(8888);
	console.log('Server has started.');
};

exports.start = start;
