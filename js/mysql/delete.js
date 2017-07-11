// 删除数据

const mysql = require('mysql');

let connection = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "nfsq772071",
	port	: "3306",
	database: "test"
});

connection.connect();

let delSql = "DELETE FROM websites where id = ?";
let delSqlParams = [6];

connection.query(delSql, delSqlParams, (err, result) => {
	if(err){
		console.log(`[DELETE ERROR] - ${err.message}`);
		return;
	}
	console.log("--------------------DELETE--------------------");
	console.log(`DELETE affectedRows ${result.affectedRows}`);
	console.log("----------------------------------------------");
});

connection.end();
