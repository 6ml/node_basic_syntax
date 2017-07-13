/**
 * MongoDB 
 * 与 MySQL 不同，MongoDB 会自动创建数据库和集合，使用前我们不需要手动去创建
 */

const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/lupath";

let insertData = (db, callback) => {
	// connect to table site
	let collection = db.collection('site');
	// insert data
	let data = [{
		"name": "菜鸟教程",
		"url": "www.runoob.com"
	}, {
		"name": "博客",
		"url": "blog.lupath.com"
	}];

	collection.insert(data, (err, result) => {
		if (err) {
			console.log(`ERROR: ${err}`);
			return;
		}
		callback(result);
	});
};


MongoClient.connect(DB_CONN_STR, (err, db) => {
	console.log("连接成功!");
	insertData(db, (result) => {
		console.log(result);
		db.close();
	});
});