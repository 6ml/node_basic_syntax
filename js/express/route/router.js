const express = require('express');

let app = express();
let router = express.Router();

// express 3.x 方法
/**
 * app.get('/sample', (req, res) => {
 *     res.send('this is a simple!');
 * });
 */

// 首页路由，地址为 localhost:8080/
router.get('/', (req, res) => {
	res.send('home page');
});

// 分页路由，地址为 localhost:8080/about
router.get('/about', (req, res) => {
	res.send('about page');
});

// 地址变成了 localhost:8080/home/ 和 localhost:8080/home/about
app.use('/home', router);

app.listen(8080, () => {
	console.log('the server is running at 127.0.0.1:8080...');
});
