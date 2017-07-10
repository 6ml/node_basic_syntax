/* Express 框架核心特性：
 * 
 * -可以设置中间件响应 HTTP 请求
 * -定义了路由表用于执行不同的 HTTP 请求动作
 * -可以通过向模板传递参数来动态渲染 HTML 页面
 */

let express = require('express');
let app = express();

app.get('/', (req, res) => {
	res.send('Hello world');
});

let server = app.listen(8081, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

