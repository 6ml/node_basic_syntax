// create RESTful server

const express = require('express');
const mongoose = require('../mongodb/mongoose/db');

let app = express();
let bodyParser = require('body-parser');
let Schema = mongoose.Schema;

// create Mongoose Schema
// create UserSchema
let UserSchema = new Schema({
	username: {type: String},
	password: {type: String},
	profession: {type: String}
});

let User = mongoose.model("User", UserSchema);

// create application/x-www-form-ulrencoded code parser
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('./'));

/**
 * 获取用户信息
 * method: GET
 * url: listUsers
 * requestContent: none
 */
let getUsers = (conditions, options) => {
	return new Promise((resolve, reject) => {
		User.find(conditions, options, (err, res) => {
			if(err){
				console.log(`get users error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

app.get('/listUsers', (req, res) => {

	getUsers({}, {})
		.then( result => {
			res.send(result);
		})
		.catch( () => {
			res.send("get users failed!");
		});
});

/**
 * 添加用户
 * method: POST
 * url: addUser
 * requestContent: {name, password, profession}
 * 从文件读取用户列表内容 data --> 读取用户输入存入一个对象 requestBody --> 将 requestBody 存入 data.list --> 将 data 写入文件
 */

let insert = (insertObj) => {
	return new Promise((resolve, reject) => {
		let user = new User(insertObj);

		user.save((err, res) => {
			if(err){
				console.log(`insert error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

app.post('/addUser', urlencodedParser, (req, res) => {
	// get user input
	let requestBody = {
		"username": req.body.name,
		"password": req.body.password,
		"profession": req.body.profession
	};

	insert(requestBody)
		.then( result => {
			res.send(result);
		})
		.catch( () => {
			res.send("Insert failed");
		});	
});

/**
 * 删除用户
 * method: DELETE
 * url: deleteUser
 * requestContent: {id}
 */

let remove = (id) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndRemove(id, (err, res) => {
			if(err){
				console.log(`delete error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

app.post('/deleteUser', urlencodedParser, (req, res) => {
	let id =  req.body.id;

	remove(id)
		.then( result => {
			res.send(result);
		})
		.catch( () => {
			res.send("delete failed!");
		});
});

/**
 * 修改用户信息
 * method: POST
 * url: editUser
 * requestContent: {id, name, password, profession}
 */

let updateById = (id, updateStr) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndUpdate(id, updateStr, (err, res) => {
			if(err){
				console.log(`update error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

app.post('/editUser', urlencodedParser, (req, res) => {
	// get user input
	let  id = req.body.id;
	let requestBody = {
		username: req.body.name,
		password: req.body.password,
		profession: req.body.profession
	};

	updateById(id, requestBody)
		.then( result => {
			res.send(result);
		})
		.catch( () => {
			res.send("update failed!");
		});
});

app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});
