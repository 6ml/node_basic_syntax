// 在 NodeJS 应用程序中，执行异步操作的函数将回调函数作为最后一个参数，回调函数接收错误对象作为第一个参数

// import fs module
let fs = require('fs');

fs.readFile('input.txt', (err, data) => {
	if(err){
		console.log(err.stack);
		return;
	}

	console.log(data.toString());
});

console.log('the process is end\n');

