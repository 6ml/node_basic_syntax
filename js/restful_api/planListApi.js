// create RESTful server

const express = require('express');
const mongoose = require('../mongodb/mongoose/db');

let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let Schema = mongoose.Schema;

// create Mongoose Schema
// create PlanSchema
let PlanSchema = new Schema({
	username: {type: String},
	avatar: {type: String},
	date: {type: Date},
	totalTime: {type: Number},
	comment: {type: String}
});

let Plan = mongoose.model("Plan", PlanSchema);

// create application/x-www-form-ulrencoded code parser
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json ：接受 json 或者可以转换为json的数据格式
app.use(bodyParser.json());

app.use(express.static('./'));

/**
 * [查询 plan 数据]
 * @param  {[object]} conditions [查询条件]
 * @param  {[object]} options    [接受数据条件]
 * @return {[object]}            [查询到的 plan 数据]
 */
let getPlans = (conditions, options) => {
	return new Promise((resolve, reject) => {
		Plan.find(conditions, options, (err, res) => {
			if(err){
				console.log(`get plans error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

router.get('/getPlans', (req, res) => {

	getPlans({}, {})
		.then(result => {
			res.send(result);
		})
		.catch( () => {
			res.send("get plans failed!");
		});
});

/**
 * [查询 totalTime ]
 * @param  {[object]} conditions [查询条件]
 * @param  {[object]} options    [接受数据条件]
 * @return {[number]}            [查询到的 totalTime ]
 */
let getTotalTime = (conditions, options) => {
	let totalTime = 0;

	return getPlans(conditions, options)
		.then(res => {
			res.forEach((plan) => {
				totalTime += plan.totalTime;
			});
			return {totalTime};
		})
		.catch( (err) => {
			console.log(`get totalTime error: ${err}`);
			return {totalTime};
		});
};

router.get('/getTotalTime', (req, res) => {

	getTotalTime({}, {})
		.then(result => {
			res.send(result);
		})
		.catch( () => {
			res.send("get totalTime failed!");
		});
});

/**
 * [添加计划]
 * @param  {[object]} planObj [要添加的计划对象]
 * @return {[object]}         [返回的消息对象]
 */
let addPlan = (planObj) => {
	return new Promise((resolve, reject) => {
		let plan = new Plan(planObj);

		plan.save((err, res) => {
			if(err){
				console.log(`add plan error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

router.post('/addPlan', (req, res) => {
	console.log(req.body);
	// get user input
	let requestBody = {
		username: req.body.username,
		avatar: req.body.avatar,
		date: req.body.date,
		totalTime: parseInt(req.body.totalTime),
		comment: req.body.comment
	};

	addPlan(requestBody)
		.then( () => {
			res.send("添加成功!");
		})
		.catch( () => {
			res.send("添加失败!");
		});
});

let deletePlan = (id) => {
	return new Promise((resolve, reject) => {
		Plan.findByIdAndRemove(id, (err, res) => {
			if(err){
				console.log(`delete plan error: ${err}`);
				reject(err);
			}
			resolve(res);
		});
	});
};

router.post('/deletePlan', (req, res) => {
	let id = req.body.id;
	console.log(id);

	deletePlan(id)
		.then( () => {
			res.send("删除成功!");
		})
		.catch( () => {
			res.send("删除失败!");
		});
});

app.use('/api', router);

app.listen(8888, () => {
	console.log('the server is running at http://172.0.0.1:8888...');
});
