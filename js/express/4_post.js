/**
 * POST 方法
 */

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// create application/x-www-form-urlencoded encoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('./'));


// ??? 不写 app.get() 同样能返回对应文件
// ??? 无论写不写 app.get() 并且无论返回什么 请求文件只会返回对应文件
app.get('/post.html', (req, res) => {
	res.sendFile(`${__dirname}/post.html`);
	res.end('5121231');
});

app.post('/process_post', urlencodedParser, (req, res) => {
	// output JSON format
	let response = {
		"first_name": req.body.first_name,
		"last_name": req.body.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

let server = app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});
