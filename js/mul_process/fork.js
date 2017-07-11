/**
 * fork() 方法
 * 
 * 语法: child_process.fork(modulePath[, args][, options])
 * 
 * 参数:
 * modulePath: 	String ，将要在子进程运行的模块
 * args: 		Array  ，字符串参数数组
 * options: 	Object
 *     cwd		String
 *     env		Object
 *     execPath	String
 *     execArgv	Array
 *     silent	Boolean
 *     uid		Number
 *     gid		Number
 * 
 * 返回的对象除了拥有 ChildProcess 实例的所有方法，还有一个内建的通信信道
 */

const fs = require('fs');
const child_process = require('child_process');

for(let i = 0; i < 3; i++){
	let worker_process = child_process.fork('support.js', [i]);

	worker_process.on('close', code => {
		console.log(`子进程已退出，退出码为: ${code}`);
	});
}
