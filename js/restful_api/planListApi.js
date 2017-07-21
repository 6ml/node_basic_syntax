// create RESTful server

const express = require('express');
const COS = require('cos-nodejs-sdk-v5');
const multipart = require('connect-multiparty');
let bodyParser = require('body-parser');
let fs = require('fs');

let app = express();
let router = express.Router();
// multipartMiddleware 中间件，上传文件用，将 req 中文件内容从 req.body 拆分至 req.files
let multipartMiddleware = multipart();
const mongoose = require('../mongodb/mongoose/db');
let Schema = mongoose.Schema;

const COS_URL = 'http://vue-1251802397.coscd.myqcloud.com/';

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

router.post('/addPlan', multipartMiddleware, (req, res) => {
	// 获取用户输入
	let file = req.files.avatar;

	let requestBody = {
		username: req.body.username,
		date: req.body.date,
		totalTime: parseInt(req.body.totalTime),
		comment: req.body.comment
	};

	console.log(req.body);
	console.log('------------');
	console.log(req.files);
	console.log('===========================\n\n');

	// 使用腾讯云存储存放图片
	let cos = new COS({
	    AppId: '1251802397',
	    SecretId: 'AKID54uZ5SBdR3Wr1zQMlvyeEdqsiMo4GMND',
	    SecretKey: 'nPp360pUyHWcXGn9KJ7nylYEi060iHj6',
	});

	var params = {
	    Bucket : 'vue',
	    Region : 'cn-southwest',
	    Key : file.originalFilename,
	    // CacheControl : 'STRING_VALUE',
	    // ContentDisposition : 'STRING_VALUE',
	    // ContentEncoding : 'STRING_VALUE',
	    ContentLength : file.size,
	    // ContentType : 'STRING_VALUE',
	    // Expect : 'STRING_VALUE',
	    // Expires : 'STRING_VALUE',
	    // ContentSha1 : 'STRING_VALUE',
	    // ACL : 'STRING_VALUE',
	    // GrantRead : 'STRING_VALUE',
	    // GrantWrite : 'STRING_VALUE',
	    // GrantFullControl : 'STRING_VALUE',
	    // 'x-cos-meta-*' : 'STRING_VALUE',
	    Body: fs.createReadStream(file.path),
	    onProgress: function (progressData) {
	        console.log(progressData);
	    },
	};
	
	// 上传文件至 COS -> addPlan (存数据库) -> 添加成功
	// 										-x 添加失败
	// 				  -x 添加失败
	new Promise((resolve, reject) => {
		// 向 COS 传文件
		cos.putObject(params, function(err) {
		    if(err) {
		        reject(err);
		    } else {
		        file.url = COS_URL + file.originalFilename;
		    }
		    resolve(file.url);
		});
	}).then((url) => {
		requestBody.avatar = url;
		addPlan(requestBody)
			.then( (result) => {
				res.send(result);
			});
	}).catch( () => {
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
