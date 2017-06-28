/* NodeJS 模块系统
 * 
 * 为了让 NodeJS 的文件可以相互调用，NodeJS 提供了一个简单的模块系统
 * 模块是 NodeJS 应用程序的基本组成部分，文件和模块是一一对应的
 * 就是说，一个 NodeJS 文件就是一个模块，这个文件可能是 JavaScript 代码、JSON 或者编译过的 C/C++ 扩展
 * 
 */

/* 创建模块
 * 
 * NodeJS 提供了 exports 和 require 两个对象
 * exports 是模块公开的接口
 * require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象
 * 
 */

// 实例
// ./module/main.js
let Hello = require('./hello');
hello = new Hello();
hello.setName('lupath');
hello.sayName();

// ./module/hello.js
Hello = () => {
	let name;
	this.setName = theName => {
		name = theName;
	};
	this.sayHello = () => {
		console.log(`Hello${name}`);
	};
};

module.exports = Hello;

