const User = require('./schema');

/**
 * Model.find(conditions, [fields], [options], [callback])
 * @param {options} [Object] [指定结果中要显示或不显示的字段]
 * 条件查询
 * return {Array}		[查询到的结果对象数组]
 */
let getByConditions = (conditions, options) => {
	let whereStr = conditions;

	User.find(whereStr, options, (err, res) => {
		if(err){
			console.log(`Query Error: ${err}`);
			return;
		}
		console.log(`Result: ${res}`);
	});
};

// getByConditions({"age": 21}, {"username": 1, "_id": 0});

/**
 * Model.findOne(conditions, [fields], [options], [callback])
 * @param {options} [Object] [指定结果中要显示或不显示的字段]
 * 查找一条数据
 * return {Object}		[查询到的第一条结果对象]
 */

let getOneByConditions = (conditions, options) => {
	let whereStr = conditions;

	User.findOne(whereStr, options, (err, res) => {
		if(err){
			console.log(`Query Error: ${err}`);
			return;
		}
		console.log(`Result: ${res}`);
	});
};

getOneByConditions({"age": 21}, {"username": 1, "_id": 0});

/**
 * 范围查询
 * {$gte: xx, $lte: xx}
 */

// getByConditions({"age": {$gte: 20, $lte: 21}}, {"_id": 0});

/**
 * Model.count(conditions, [callback])
 * 数量查询
 * @return {Number} [查询结果的数量]
 */

let getCountByConditions = (conditions) => {
	let whereStr = conditions;

	User.count(whereStr, (err, res) => {
		if(err){
			console.log(`Query Error: ${err}`);
			return;
		}
		console.log(`Result: ${res}`);
	});
};

// getCountByConditions({"age": {$gte: 20, $lte: 21}});

/**
 * Model.findById(id, [fields], [options], [callback])
 * 根据 _id 查询
 * @return {Object} [查询到的结果对象]
 */

let getById = (id) => {

	User.findById(id, (err, res) => {
		if(err){
			console.log(`Query Error: ${err}`);
			return;
		}
		console.log(`Result: ${res}`);
	});
};

// getById("59678cc5978af6549084019f");

/**
 * 模糊查询
 * 将 conditions 对象的值设置为正则表达式
 * @return {Array} [查询到的结果对象数组]
 */

// getByConditions({"username": {$regex: /h/i}});

/**
 * 分页查询
 * Model.find(condition).skip(skipNum).limit(pageSize).sort(sort).exec(callback)
 * @return {Array} [查询到的结果对象数组]
 */

let getByPager = () => {
	let pageSize = 5;							// 每页数量
	let currentPage = 1;						// 当前页
	let sort = {"loginDate": -1};				// 排序(按登记时间倒序)
	let conditions = {};						// 条件
	let skipNum = (currentPage - 1) * pageSize;	// 跳过数量

	User.find(conditions).skip(skipNum).limit(pageSize).sort(sort).exec( (err, res) => {
		if(err){
			console.log(`Query Error: ${err}`);
			return;
		}
		console.log(Object.prototype.toString.call(res));
		console.log(`Result: ${res}`);
	});
};

// getByPager();
