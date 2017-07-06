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
