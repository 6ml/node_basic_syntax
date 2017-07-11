/**
 * NodeJS 多进程
 * 
 * NodeJS 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能
 * 
 * 每个子进程总带有三个流对象：child.stdin , child.stdout 和 child.stderr
 * 它们可能会共享父进程的 stdio 流，或者也可以是对立的被导流的流对象
 * 
 * NodeJS 提供了 child_process 模块来创建子进程，方法有：
 * exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以毁掉函数参数的形式返回
 * spawn - child_process.spawn 使用指定的命令行参数创建新进程
 * fork - child_process.fork 是 spawn() 的特殊形式，用于在子进程中运行的模块。与 spawn 方法不同的是，fork 会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信
 */

/**
 * exec() 方法
 * 
 * 语法: child_process.exec(command[, options], callback)
 * 
 * 参数:
 * command: 字符串，将要运行的命令，参数使用空格隔开
 * options: 对象，可以使: cwd env encoding shell timeout maxBuffer killSignal uid gid
 * callback: 回调函数，包括三个参数 error , stdout 和 stderr
 * 
 * exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容
 */

const fs = require('fs');
const child_process = require('child_process');

for(let i = 0; i < 3; i++){
	let workerProcess = child_process.exec('node support.js ' + i, (error, stdout, stderr) => {
		if(error){
			console.log(error.stack);
			console.log('Error code: ' + error.code);
			console.log('Signal received: ' + error.signal);
		}
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
	});

	workerProcess.on('exit', (code) => {
		console.log('子进程已退出，退出码: ' + code);
	});
}
