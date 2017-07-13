// 更新数据

const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/lupath";

let updateData = (db, callback) => {
	// connect to table
	let collection = db.collection('site');
	// update data
	let whereStr = {
		"name": "菜鸟教程"
	};

	let updateStr = {
		$set: {
			"name": "百度",
			"url": "https://www.baidu.com"
		}
	};

	collection.update(whereStr, updateStr, (err, result) => {
		if (err) {
			console.log(`ERROR: ${err}`);
			return;
		}
		callback(result);
	});
};

MongoClient.connect(DB_CONN_STR, (err, db) => {
	console.log('connect success!');
	updateData(db, result => {
		console.log(result);
		db.close();
	});
});