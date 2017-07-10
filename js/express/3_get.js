/**
 * GET 方法
 */

let express = require('express');
let app = express();

app.use(express.static('./'));

app.get('/get.html', (req, res) => {
	res.sendFile(`${__dirname}/get.html`);
});

app.get('/process_get', (req, res) => {
	// 输出 JSON 格式
	let response = {
		"first_name": req.query.first_name,
		"last_name": req.query.last_name
	};

	console.log(response);
	res.end(JSON.stringify(response));
});

let server = app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});
