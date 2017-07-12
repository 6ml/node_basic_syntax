// 更新数据

const mysql = require('mysql');

let connection = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "nfsq71231",
	port	: "3306",
	database: "test"
});

connection.connect();

let modSql = "UPDATE websites SET name = ?,url = ? where Id = ?";
let modSqlParams = ["菜鸟移动站", "https://m.runoob.com", 6];

connection.query(modSql, modSqlParams, (err, result) => {
	if(err){
		console.log(`[UPDATE ERROR] - ${err.message}`);
		return;
	}
	console.log("-----------------UPDATE-----------------");
	console.log(`UPDATE affectedRows ${result.affectedRows}`);
	console.log("----------------------------------------");
});

connection.end();
