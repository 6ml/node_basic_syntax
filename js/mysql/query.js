// 查询数据

const mysql = require('mysql');

let connection = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "nfsq772071",
	port	: "3306",
	database: "test"
});

connection.connect();

let sql = 'SELECT * FROM websites';

connection.query(sql, (err, result) => {
	if(err){
		console.log(`[SELECT ERROR] - ${err.message}`);
		return;
	}

	console.log("-----------SELECT-----------");
	console.log(result);
	console.log("----------------------------");
});

connection.end();
