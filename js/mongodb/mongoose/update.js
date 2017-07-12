let User = require('./schema');

/**
 * 更新数据
 * Model.update(conditions, update[, options][, callback])
 */

let update = () => {
	let whereStr = {"username": "lupath"};
	let updateStr = {"password": "123456"};

	User.update(whereStr, updateStr, (err, result) => {
		if(err){
			console.log(`Update Error: ${err}`);
			return;
		}
		console.log(`Result: ${result}`);
	});
};

update();
