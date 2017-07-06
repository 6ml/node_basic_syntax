/*
 * Web 模块
 */

// 使用 NodeJS 创建 Web 服务器
// NodeJS 提供了 http 模块，http 模块主要用于搭建 HTTP 服务器和客户端，使用 HTTP 服务器或客户端功能就必须调用 http 模块

let http = require('http');
let fs = require('fs');
let url = require('url');

// 创建服务器
http.createServer( (req, res) => {
	// 解析请求，包括文件名
	let pathname = url.parse(req.url).pathname;

	// 输出请求的文件名
	console.log(`Request for ${pathname} received.`);

	// 从文件系统中读取请求的文件内容
	fs.readFile(pathname.substr(1), (err, data) => {
		if(err){
			console.log(err);
			res.writeHead(404, {"Content-Type": "text/html"});
		}else{
			res.writeHead(200, {"Content-Type" : "text/html"});

			// 响应文件内容
			res.write(data.toString());
		}
		// 发送响应数据
		res.end();
	});
}).listen(8080);

console.log("The server is running at 172.0.0.1:8080...");

