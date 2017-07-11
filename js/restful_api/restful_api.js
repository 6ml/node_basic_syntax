/**
 * REST 即表述性状态传递(Representational State Transfer)
 * 
 * REST 是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful
 * 
 * REST 通常使用 JSON 数据格式
 * 
 */

/**
 * HTTP 方法：
 * 以下为 REST 基本架构的四个方法：
 * - GET - 用于获取数据
 * - PUT - 用于更新或添加数据
 * - DELETE - 用于删除数据
 * - POST - 用于添加数据
 */

/**
 * RESTful Web Services
 * 
 * 基于 TRSE 架构的 Web Services 就是 RESTful
 */

// create RESTful server

let express = require('express');
let app = express();
let fs = require('fs');
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
	fs.readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
		// console.log(data);
		res.end(data);
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

	fs.readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
		data = JSON.parse(data);
		let list = data.list;
		let length = list.length;

		// output JSON format
		let requestBody = {
			"name": req.body.name,
			"password": req.body.password,
			"profession": req.body.profession,
			"id": parseInt(list[length - 1].id) + 1
		};

		list.push(requestBody);

		fs.writeFile(`${__dirname}/users.json`, JSON.stringify(data), (err) => {
			if(err){
				res.end(err);
				return console.error(err);
			}
			// res.set({"Content-Type":"application/text;charset=utf-8"});
			res.end('添加用户成功');
		});
	});
});

/**
 * 删除用户
 * method: DELETE
 * url: deleteUser
 * requestContent: {id}
 */

app.post('/deleteUser', urlencodedParser, (req, res) => {

	fs.readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
		data = JSON.parse(data);
		let list = data.list;

		let id = parseInt(req.body.id);

		let flag = false;

		list.forEach( (child, index) => {
			if(child.id === id){
				list.splice(index, 1);
				flag = true;
			}
		});

		if(!flag){
			// console.log("删除用户失败: 没有该用户");
			res.end('没有该用户！');
		}

		fs.writeFile(`${__dirname}/users.json`, JSON.stringify(data), (err) => {
			if(err){
				res.end(err);
				return console.error(err);
			}
			// res.set({"Content-Type":"application/text;charset=utf-8"});
			res.end('删除用户成功');
		});
	});
});

/**
 * 修改用户信息
 * method: POST
 * url: editUser
 * requestContent: {id, name, password, profession}
 */

app.post('/editUser', urlencodedParser, (req, res) => {

	fs.readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
		data = JSON.parse(data);
		let list = data.list;

		// output JSON format
		let requestBody = {
			"name": req.body.name,
			"password": req.body.password,
			"profession": req.body.profession,
			"id": parseInt(req.body.id)
		};

		let flag = false;

		list.forEach( (child, index) => {
			if(child.id === requestBody.id){
				list.splice(index, 1, requestBody);
				flag = true;
			}
		});

		if(!flag){
			res.end('没有该用户！');
		}

		fs.writeFile(`${__dirname}/users.json`, JSON.stringify(data), (err) => {
			if(err){
				res.end(err);
				return console.error(err);
			}
			// res.set({"Content-Type":"application/text;charset=utf-8"});
			res.end('修改用户信息成功');
		});
	});
});

let server = app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});
