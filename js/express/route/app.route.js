/**
 * app.route / router.route
 * 可以针对一个路由新增多个动作
 */

const express = require('express');

let app = express();
let router = express.Router();

// app.route('/login')
// 	.get( (req, res) => {
// 		res.send("this if the login form");
// 	})
// 	.post( (req, res) => {
// 		console.log('processing');
// 		res.send('processing the login form!');
// 	});

router.route('/login')
	.get( (req, res) => {
		res.send("this if the login form");
	})
	.post( (req, res) => {
		console.log('processing');
		res.send('processing the login form!');
	});

app.use('/user', router);


app.listen(8080, () => {
	console.log('the server is running at 127.0.0.1:8080...');
});
