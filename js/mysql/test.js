/**
 * NodeJS 连接 MySQL
 */

const mysql = require('mysql');
let connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'nfsq772071',
	database: 'test'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, result, fields) => {
	if(error){
		throw error;
	}
	console.log('the solution is: ', result[0].solution);
});
