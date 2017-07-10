/**
 * 静态文件
 * Express 提供了内置的中间件 express.static 来设置静态文件如：图片、CSS 、JavaScript 等
 * 可以使用 express.status 中间件来设置静态文件路径
 * 如：app.use(express.static('public'));
 */

let express = require('express');
let app = express();

app.use(express.static('../module'));

app.get('/', (req, res) => {
	res.send('Hello world');
});

let server = app.listen(8080, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log('static serevr is running at http://%s:%s...', host, port);
});

// 然后通过 localhost:8080/filename 就可以取到 module 文件夹内的文件
