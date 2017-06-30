/* 全局对象
 * 
 * JavaScript 中有一个特殊的对象-全局对象(global object)
 * 全局对象及其所有属性都可以在程序的任何地方访问，即全局变量
 * 
 * 在浏览器中，全局对象通常是 window ，在 NodeJS 中全局对象是 global
 * 
 */

/* 全局对象与全局变量
 * 
 * global 最根本的作用是作为全局变量的宿主
 * 
 * 根据 ECMAScript 的定义，满足一下条件的变量是全局变量:
 * - 在最外层定义的变量
 * - 全局对象的属性
 * - 隐式定义的对象(未定义直接赋值的变量)
 * 
 * 在 NodeJS 中，不可能在最外层定义变量，因为所有用户代码都是属于当前模块的，而模块本身不是最外层上下文
 * 
 */

/* __filename
 *
 * 表示当前正在执行的脚本的文件名
 * 
 * 输出文件所在位置的绝对路径
 *
 * 且和命令行参数所指定的文件名不一定相同
 * 
 */


/* __dirname
 * 
 * 表示当前执行脚本所在的目录
 * 
 */


/* setTimeout(cb, ms)
 * 
 * setTimeout(cb, ms)全局函数在指定的毫秒(ms)数后执行指定函数(cb)
 * 
 * setTimeout()只执行一次
 * 
 * 返回一个代表定时器的句柄值
 * 
 */


/* clearTimeout(t)
 * 
 * clearTimeout(t)全局函数用于停止一个之前通过 setTimeout() 创建的定时器
 * 
 * 参数:
 * t-通过 setTimeout() 函数创建的定时器
 * 
 */

/* setInterval(cb, ms)
 * 
 * setInterval(cb, ms)全局函数在指定的毫秒(ms)数后执行指定函数(cb)
 * 
 * 返回一个代表定时器的句柄值，可以用 clearInterval(t) 函数来清除定时器
 * 
 * setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
 *
 */

/* console
 * 
 * 用于提供控制台标准输出，它是由 Internet Explorer 的 JScript 引擎提供的调试工具，后来逐渐成为浏览器的事实标准
 * 
 * NodeJS 沿用了这个标准，提供与习惯行为一致的 console 对象，用于向标准输出流(stdout)或标准错误流(stderr)输出字符
 * 
 * 方法:
 * console.log([data][, ...])-向标准输出流打印字符并以换行符结束。若只有一个参数，则输出这个参数的字符串形式；若有多个参数，则类似 C 语言 printf()命令的格式输出
 * 
 * console.info([data][, ...])-该命令的作用是返回信息性消息
 * 
 * console.error([data][, ...])-输出错误消息
 * 
 * console.warn([data][, ...])-输出警告信息
 * 
 * console.dir([obj][, options])-用来对一个对象进行检查
 * 
 * console.time(label)-输出时间，表示计时开始
 * 
 * console.timeEnd(label)-结束时间，表示计时结束
 * 
 * console.trace(message[, ...])-当前执行的代码在堆栈中的调用路径，测试函数运行很有帮助，只要给想要测试的函数里加 console.trace 即可
 * 
 * console.assert(value[, message][, ...])-用于判断某个表达式或变量是否威震，接受两个参数，第一个是表达式，第二个是字符串；只有第一个参数为 false 才会输出第二个参数
 * 
 */

// 实例
console.log('=============== console\n');
console.log('hello world');
console.log('hello %d', 1995);

console.trace();

console.info('程序开始执行:');
let counter = 10;
console.log('计数: %d', counter);

console.time("数学运算");

let a = 1 * 4 + 30 / (13 - 3);

console.timeEnd("数学运算");

console.info("程序执行完毕");

/* process
 * 
 * process 是一个全局变量，即 global 对象的属性
 * 
 * 用于描述当前 NodeJS 进程状态的对象，提供一个与操作系统的简单接口
 * 
 * 事件:
 * exit-当进程退出时触发
 * beforeExit-当 node 清空事件循环，并且没有其他安排时触发这个事件
 * uncaoughtException-当一个异常冒泡回到事件循环，触发这个事件；如果给异常添加了监视器，默认操作(打印堆栈跟踪信息并退出)就不会发生
 * Signal 事件-当进程接收到信号时触发
 * ...
 * 
 * 属性:
 * stdout-标准输出流
 * stderr-标准错误流
 * stdin -标准输入流
 * argv  -返回一个数组
 * ...
 * 
 * 方法:
 * abort()
 * chdir(directory)
 * cwd()
 * exit([code])
 * getgid()
 * ...
 * 
 */

// 实例
console.log('============== process event\n');
process.on('exit', (code) => {
	// 以下代码永远不会执行
	setTimeout( () => {
		console.log('执行了没？');
	}, 0);

	console.log("退出码:", code);
});

console.log('============== process property\n');

// print to terminal
process.stdout.write("hello world!\n");

// read by argument
process.argv.forEach( (val, index, array) => {
	console.log(index + ":" + val);
});

// get exec path
console.log(process.execPath);

// get platform info
console.log(process.platform);

console.log('============= process method\n');

// print present dirname
console.log("当前目录:" + process.cwd());

// print present version
console.log("当前版本:" + process.version);

// print memory usage
console.log(process.memoryUsage());

