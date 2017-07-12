let User = require('./schema');

/**
 * 插入数据
 * Model#save([fn])
 */

let insert = () => {
	let user = new User({
		username: "lupath",
		password: "123abc",
		age: 21,
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

insert();
