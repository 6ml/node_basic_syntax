// connect mysql
const mysql = require('mysql');

let connection = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "nfsq71231",
	port	: "3306",
	database: "test"
});

connection.connect();

// create RESTful server

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// create application/x-www-form-ulrencoded code parser
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('./'));

app.get('/rest_add.html', (req ,res) => {
	res.sendFile(`${__dirname}/rest_add.html`);
});


app.get('/rest_delete.html', (req ,res) => {
	res.sendFile(`${__dirname}/rest_delete.html`);
});

app.get('/rest_edit.html', (req ,res) => {
	res.sendFile(`${__dirname}/rest_edit.html`);
});

/**
 * 获取用户信息
 * method: GET
 * url: listUsers
 * requestContent: none
 */
 
app.get('/listUsers', (req, res) => {
	let selectSql = "SELECT * FROM user";
	connection.query(selectSql, (err, result, fields) => {
		if(err){
			console.log(`[SELECT ERROR] - ${err.message}`);
			res.end('select error');
			return;
		}
		res.end(JSON.stringify(result));
	});
});

/**
 * 添加用户
 * method: POST
 * url: addUser
 * requestContent: {name, password, profession}
 * 从文件读取用户列表内容 data --> 读取用户输入存入一个对象 requestBody --> 将 requestBody 存入 data.list --> 将 data 写入文件
 */

app.post('/addUser', urlencodedParser, (req, res) => {
	// 读取用户输入
	let requestBody = {
		"name": req.body.name,
		"password": req.body.password,
		"profession": req.body.profession
	};

	// sql 语句
	let insertSql = "INSERT INTO user(id, name, password, profession) VALUES (0, ?, ?, ?)";
	let insertSqlParams = [requestBody.name, requestBody.password, requestBody.profession];

	connection.query(insertSql, insertSqlParams, (err, result) => {
		if(err){
			console.log(`[INSERT ERROR] - ${err.message}`);
			res.end("insert error");
			return;
		}
		res.end(JSON.stringify(result));
	});
});

/**
 * 删除用户
 * method: DELETE
 * url: deleteUser
 * requestContent: {id}
 */

app.post('/deleteUser', urlencodedParser, (req, res) => {
	// 读取用户输入
	let id = parseInt(req.body.id);

	let deleteSql = "DELETE FROM user WHERE id = ?";
	let deleteSqlParams = [id];

	connection.query(deleteSql, deleteSqlParams, (err, result) => {
		if(err){
			console.log(`[DELETE ERROR] - ${err.message}`);
			res.end("delete error");
			return;
		}
		res.end(JSON.stringify(result));
	});
});

/**
 * 修改用户信息
 * method: POST
 * url: editUser
 * requestContent: {id, name, password, profession}
 */

app.post('/editUser', urlencodedParser, (req, res) => {
	// 读取用于输入
	let requestBody = {
		"name": req.body.name,
		"password": req.body.password,
		"profession": req.body.profession,
		"id": parseInt(req.body.id)
	};

	let updateSql = "UPDATE user SET name = ?, password = ?, profession = ? WHERE id = ?";
	let updateSqlParams = [requestBody.name, requestBody.password, requestBody.profession, requestBody.id];

	connection.query(updateSql, updateSqlParams, (err, result) => {
		if(err){
			console.log(`[UPDATE ERROR] - ${err.message}`);
			res.end("update error");
			return;
		}
		res.end(JSON.stringify(result));
	});
});

let server = app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});

// 断开 mysql 连接
// connection.end();
