/**
 * spawn() 方法
 * 
 * 语法: child_process.spawn(command[, args][, options])
 * 
 * 参数:
 * command: 将要运行的命令
 * args: Array 字符串参数数组
 * options Object:
 *     cwd 		String
 *     env 		Object
 *     stdio 	Array|String
 *     detached Boolean
 *     uid		Number
 *     gid		Number
 * 
 * spawn() 方法返回流(stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接受响应
 */

const fs = require('fs');
const child_process = require('child_process');

for(let i = 0; i < 3; i++){
	let workerProcess = child_process.spawn('node', ['support.js', i]);

	workerProcess.stdout.on('data', data => {
		console.log(`stuout: ${data}`);
	});

	workerProcess.stderr.on('data', data => {
		console.log(`stderr: ${data}`);
	});

	workerProcess.on('close', code => {
		console.log(`子进程已退出，退出码为: ${code}`);
	});
}
