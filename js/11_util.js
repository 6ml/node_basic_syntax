/* NodeJS 常用工具
 * 
 * util 是一个 NodeJS 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能国语精简的不足
 * 
 */

/* util.inherits
 *
 * util.inherits(constuctor, superConstructor) 是一个实现对象间原型继承的函数
 * 
 * JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同
 * JavaScript 没有提供对象继承的语言级别特性，通过原型复制来实现
 * 
 * util.inherits() 方法**仅仅继承超类原型中定义的函数**，而超类内部创造的属性和方法都没有被子类继承
 * 
 */

// 实例

/*
let util = require('util');

function Super() {
	this.name = 'super';
	this.year = 1995;
	this.sayHello = () => {
		console.log(`Hello ${this.name}`);
	};
}

Super.prototype.showName = function() {
	console.log(this.name);
};

function Sub() {
	this.name = 'sub';
}
util.inherits(Sub, Super);

let superObj = new Super();
superObj.showName();
superObj.sayHello();
console.log(superObj);

let subObj = new Sub();
subObj.showName();
console.log(subObj.year);
// subObj.sayHello(); 报错，TypeError 对象没有该方法
console.log(subObj);
*/

/* util.inspect
 * 
 * 将任意对象转换成字符串的方法，通常用于调试和错误输出
 * **该函数并不会简单地直接把对象转换成字符串，即使该对象定义了 toString 方法也不会调用**
 *
 * 方法:
 * util.inspect(object[, showHidden][, depth][, colors])
 * 
 * 参数:
 * object - 即要转换的对象
 * showHidden - 如果值为 true ，将会输出更多隐藏信息
 * depth - 表示最大递归层数，默认为 2 ，null 将不限递归层数完整遍历对象
 * color - 若为 true ，输出格式将会以 ANSI 颜色编码
 * 
 */

// 实例

let util = require('util');

function Person() {
	this.name = "lupath";
	this.toString = () => {
		return this.name;
	};
}

let obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true, null, true));

/* util.isArray(object)
 * 
 * 判断传入对象是否为数组对象
 * 
 */

/* util.isRegExp(object)
 *
 * 判断传入对象是否为一个正则表达式对象
 *
 */

/* util.isDate(object)
 *
 * 判断传入对象是否为日期对象
 *
 */

/* util.isError(object)
 *
 * 判断传入对象是否为 error 对象
 *
 */

