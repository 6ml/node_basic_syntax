let User = require('./schema');

/**
 * 更新数据
 * Model.update(conditions, update[, options][, callback])
 * @return {Object} [description]
 */

let update = () => {
	let whereStr = {
		"username": "lupath"
	};
	let updateStr = {
		"password": "123456"
	};

	User.update(whereStr, updateStr, (err, result) => {
		if (err) {
			console.log(`Update Error: ${err}`);
			return;
		}
		console.log(`Result: ${result}`);
	});
};

update();

/**
 * Model.findByIdAndUpdate(id, [update], [options], [callback])
 * 根据 _id 进行更新 
 */

let findByIdAndUpdate = () => {
	let id = "59663386c082244b84dcaf0f";
	let updateStr = {
		"age": 22
	};

	User.findByIdAndUpdate(id, updateStr, (err, res) => {
		if(err){
			console.log(`Update Error: ${err}`);
			return;
		}
		console.log(`Result: ${res}`);
	});
};

findByIdAndUpdate();

/**
 * 其他更新方法
 * Model.findOneAndUpdate([conditions], [update], [options], [callback])
 * 找到一条记录并更新
 */


