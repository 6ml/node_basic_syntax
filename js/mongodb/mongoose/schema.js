let mongoose = require('./db.js'),
	Schema = mongoose.Schema;

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
