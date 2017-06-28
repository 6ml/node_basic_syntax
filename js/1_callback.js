//NodeJS 异步编程的直接体现就是回调
//NodeJS 使用了大量的回调函数，NodeJS 所有 API 都支持回调函数

//sync
/*
let fs = require('fs');

let data = fs.readFileSync('repl.txt');

console.log(data.toString());
console.log('The program is end\n');
*/

//async
let fs = require('fs');

fs.readFile('repl.txt', (err, data) => {
	if(err){
		return console.log(err);
	}
	console.log(data.toString());
});

console.log('the program is end\n');

