/* Express 请求和响应
 *
 * Express 应用使用回调函数的参数：request 和 response 对象来处理请求和响应的数据
 * 
 * Request 对象 - request 对象表示 HTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性
 * 
 * Response 对象 - response 对象表示 HTTP 响应，即在接收请求时向客户端发送的 HTTP 响应数据
 * 
 */

/* 路由
 *
 * 路由决定了由谁(指定脚本)去响应客户端请求
 * 
 * 在 HTTP 请求中，我们可以通过路由提取出请求的 URL 以及 GET/POST 参数
 * 
 */

let express = require('express');
let app = express();

// 主页输出 "hello world"
app.get('/', (req, res) => {
	console.log('主页 GET 请求');
	res.send('Hello get');
});

// POST 请求
app.post('/', (req, res) => {
	console.log('主页 POST 请求');
	res.send('Hello post');
});

// /del_user 
app.get('/del_user', (req, res) => {
	console.log('del_user 响应 delete 请求');
	res.send('删除页面');
});

// /list_user 
app.get('/list_user', (req, res) => {
	console.log('list_user 响应请求');
	res.send('用户列表页面');
});

// 对页面 abcd , abxcd , ab*cd 等响应 GET 请求
app.get('/ab*cd', (req, res) => {
	console.log('ab*cd GET 请求');
	res.send('正则匹配');
});

let server = app.listen(8080, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log('应用实例，访问地址 http://%s:%s', host, port);
});
