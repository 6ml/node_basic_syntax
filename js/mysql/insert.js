// 插入数据

const mysql = require('mysql');

let connection = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "nfsq71231",
	port	: "3306",
	database: "test"
});

connection.connect();

let addSql = "INSERT INTO websites(id,name,url,alexa,country) VALUES (0,?,?,?,?)";
let addSqlParams = ["菜鸟工具", "http://blog.lupath.com", "23453", "CN"];

connection.query(addSql, addSqlParams, (err, result) => {
	if(err){
		console.log(`[Insert Error] - ${err.message}`);
		return;
	}

	console.log("---------------Insert---------------");
	console.log(`Insert Id: ${result}`);
	console.log("------------------------------------");
});

connection.end();
