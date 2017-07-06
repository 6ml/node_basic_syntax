/*
 * NodeJS GET/POST请求
 */

// 获取 GET 请求

/*
let http = require('http');
let url = require('url');
let util = require('util');

http.createServer( (req, res) => {
	res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	res.end(util.inspect(url.parse(req.url, true)));
}).listen(8080);

console.log("The server is running at port 8080...");
*/

// 获取 URL 中的参数
/*
let http = require('http');
let url = require('url');
let util = require('util');

http.createServer( (req, res) => {
	res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

	// 解析 url 中的参数
	let params = url.parse(req.url, true).query;
	res.write(`网站名：${params.name}\n网站 url：${params.url}`);
	// res.write(params);
	// for(var i in params){
	// 	res.write(params[i]);
	// }
	res.end();
}).listen(8080);

console.log("The server is running at 172.0.0.1:8080...");
*/

// 获取 POST 请求内容
/*
let http = require('http');
let querystring = require('querystring');

http.createServer( (req, res) => {
	// 定义一个 post 变量，用于暂存请求体的信息
	let post = "";

	// 通过 req 的 data 事件监听函数，每当接受到请求体的数据，就累加到 post 变量中
	req.on('data', (chunk) => {
		post += chunk;
	});

	// 在 end 事件触发后，通过 querystring.parse 将 post 解析为真正的 POST 请求格式，然后向客户端返回
	req.on('end', () => {
		post = querystring.parse(post);
		res.end(util.inspect(post));
	});
}).listen(8080);

console.log('The server is running at 172.0.0.1:8080...');
*/

let http = require('http');
let querystring = require('querystring');
 
let postHTML = `
  <html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>
  <body>
  <form method="post">
  网站名： <input name="name"><br>
  网站 URL： <input name="url"><br>
  <input type="submit">
  </form>
  </body></html>`;
 
http.createServer( (req, res) => {
  let body = "";
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(8080);

console.log('The server is running at 172.0.0.1:8080...');
