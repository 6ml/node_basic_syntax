let mongoose = require('./db.js'),
	Schema = mongoose.Schema;

/**
 * Schema 是 mongoose 里会用到的一种数据模式，可以裂解为表结构的定义
 * 每个 Schema 会映射到 mongodb 中的一个 collection ， 但不具备操作数据库的能力
 * Schema 数据类型：String Number Boolean|Bool Array Buffer Date ObjectId|Oid Mixed 
 */

/**
 * 用户信息
 */
let UserSchema = new Schema({
	username: {type: String},
	password: {type: String},
	age: {type: Number},
	loginDate: {type: Date}
});

module.exports = mongoose.model("User", UserSchema);
