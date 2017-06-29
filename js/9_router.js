/* 路由
 * 
 * 我们要为路由提供请求的 URL 和其他需要的 GET 和 POST 参数，随后路由根据这些数据来执行相应的代码
 * 因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数
 * 我们需要的所有数据都会包含在 request 对象中,该对象作为 onRequest() 回调函数的第一个参数传递
 * 为了解析这些数据，我们需要额外的 NodeJS 模块-- url 和 queryString 模块
 * 
 */

// 给 onRequest() 函数加上逻辑，用于找出浏览器请求的 URL 路径

let http = require('http');
let url = require('url');

start = () => {
	onRequest = (request, response) => {
		let pathName = url.parse(request.url).pathname;
		console.log(`Request for ${pathName} received.`);
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

// 路由的目的就是根据 URL 的不同来执行相应的操作，这些操作就是后台给前端的 API
// 前端通过请求的不同的 URL 访问后台的方法，路由并且可以取到前端传递的参数，最后返回响应的东西给前端

