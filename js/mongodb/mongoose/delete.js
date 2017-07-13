let User = require('./schema');

/**
 * Model.remove(conditions, [callback])
 * 删除
 * @return {Object}		[{"ok": 0|1 , n : num(受影响的行数)}]
 */

let del = () => {
	let whereStr = {"username": "lupath"};

	User.remove(whereStr, (err, res) => {
		if(err){
			console.log(`Delete Error: ${err}`);
			return;
		}
		console.log(`Result: ${res}`);
	});
};

del();

/**
 * Model.findByIdAndRemove(id, [options], [callback])
 * 根据 _id 删除指定项
 */


/**
 * Model.findOneAndRemove(conditions, [options], [callback])
 * 找到一项并删除
 */
