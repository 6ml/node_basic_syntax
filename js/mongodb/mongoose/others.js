const mongoose = require('./db'),
		Schema = mongoose.Schema;

/**
 * 索引和默认值
 */

/**
 * User Info
 */

let UserSchema = new Schema({
	username: {type: String, index: true},
	password: {type: String},
	age: {type: String},
	loginDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User", UserSchema);


/**
 * LBS 地址位置
 * lbs : {type: Array, index: "2d", spaese: true}
 */

/**
 * 去重
 * Model.distinct(field, [conditions], [callback])
 */

/**
 * 特殊运算符
 * 
 *  $or　　　　		或关系
 *	$nor　　　 		或关系取反
 * 	$gt　　　　		大于
 *  $gte　　　 		大于等于
 *  $lt　　　　 	小于
 *  $lte　　　  	小于等于
 *  $ne            	不等于
 *  $in             在多个值范围内
 *  $nin           	不在多个值范围内
 *  $all            匹配数组中多个值
 *  $regex　　		正则，用于模糊查询
 *  $size　　　		匹配数组大小
 *  $maxDistance　　范围查询，距离（基于LBS）
 *  $mod　　   		取模运算
 *  $near　　　		邻域查询，查询附近的位置（基于LBS）
 *  $exists　　  	字段是否存在
 *  $elemMatch　　	匹配内数组内的元素
 *  $within　　		范围查询（基于LBS）
 *  $box　　　 		范围查询，矩形范围（基于LBS）
 *  $center       	范围查询，圆形范围（基于LBS）
 *  $centerSphere　	范围查询，球形范围（基于LBS）
 *  $slice　　　　	查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
 */
