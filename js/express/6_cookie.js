/**
 * Cookie 管理
 * 我们可以使用中间件向 NodeJS 服务器发送 cookie 信息
 */

// output cookie info that client send
let express = require('express');
let cookieParser = require('cookie-parser');

let app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
	console.log("Cookies: ", req.cookies);
});

app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});
