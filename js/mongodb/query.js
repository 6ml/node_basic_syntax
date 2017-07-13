const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/lupath";

let selectData = (db, callback) => {
	// connect to table
	let collection = db.collection("site");
	// query data
	let whereStr = {
		"name": "菜鸟教程"
	};

	collection.find(whereStr).toArray((err, result) => {
		if (err) {
			console.log(`ERROR: ${err}`);
			return;
		}
		callback(result);
	});
};

MongoClient.connect(DB_CONN_STR, (err, db) => {
	console.log("connect success!");

	selectData(db, (result) => {
		console.log(result);
		db.close();
	});
});