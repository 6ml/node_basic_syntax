let User = require('./schema');

/**
 * Model model 是由 schema 生成的模型，可以对数据库操作
 */

/**
 * 插入数据
 * Model#save([fn])
 * @return {Object} [插入到 mongodb 中的对象]
 */

let insert = (username, password, age) => {
	let user = new User({
		username,
		password,
		age,
		loginDate: new Date()
	});

	user.save( (err, result) => {
		if(err){
			console.log(`ERROR: ${err}`);
			return;
		}
		console.log(`Result: ${result}`);
	});
};

insert("lupath", "123456", 21);
insert("zhangsan", "234567", 21);
insert("lisi", "abcdef", 22);
