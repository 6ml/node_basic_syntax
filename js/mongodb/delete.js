// 删除数据
const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/lupath";

let delData = (db, callback) => {
	// connect to table
	let collection = db.collection('site');
	// delete data
	let whereStr = {
		"name": "百度"
	};
	collection.remove(whereStr, (err, result) => {
		if (err) {
			console.log(`ERROR: ${err}`);
			return;
		}
		callback(result);
	});
};

MongoClient.connect(DB_CONN_STR, (err, db) => {
	console.log('connect success!');
	delData(db, result => {
		console.log(result);
		db.close();
	});
});