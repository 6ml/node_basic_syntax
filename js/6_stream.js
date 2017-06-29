/* Stream(流)
 * 
 * Stream 是一个抽象接口，NodeJS 中有很多对象实现了这个接口。
 * 例如，对 http 服务器发起请求的 request 对象就是一个 Stream ，还有 stdout (标准输出)
 * 
 * 在 NodeJS 中，Stream 有四种流类型:
 * Readable-可读操作
 * Writable-可写操作
 * Duplex-可读可写操作
 * Transform-操作被写入数据，然后读出结果
 * 
 * 所有 Stream 对象都是 EventEmitter 的实例。常用事件有:
 * data-当有数据可读时触发
 * end-没有更多的数据可读时触发
 * error-在接收和写入过程中发生错误时触发
 * finish-所有数据已被写入到底层系统时触发
 * 
 */

/* 从流中读取数据
 */

// 实例
/*
let fs = require('fs');
let data = "";

// create readable stream
let readerStream = fs.createReadStream('repl.txt');

readerStream.setEncoding("UTF-8");

// handle stream event --> data, end, and error
readerStream.on('data', chunk => {
	console.log('data is coming\n');
	data += chunk;
});

readerStream.on('end', () => {
	console.log('read data end\n');
	console.log(data);
});

readerStream.on('error', err => {
	console.log(err.stack);
});

console.log('the program is end\n');
*/

/* 写入流
 */

// 实例
/*
let fs = require('fs');
let data = "博客地址: blog.lupath.com";

// create a writable stream, write into file output.txt
let writerStream = fs.createWriteStream('output.txt');

// use utf-8 encoding
writerStream.write(data, 'UTF8');

// mark the end of file
writerStream.end();

// handle stream event --> data, end, and error
writerStream.on('finish', () => {
	console.log('write finish');
});

writerStream.on('error', err => {
	console.log(err.stack);
});

console.log('the program is end\n');
*/

/* 管道流
 * 
 * 管道提供了一个输出流到输入流的机制。
 * 通常我们用于从一个流中获取数据并将数据传递到另一个流中
 * 
 */

// 实例
/*
let fs = require('fs');

// create a readable stream
let readerStream = fs.createReadStream('repl.txt');

// create a writable stream
let writerStream = fs.createWriteStream('output.txt');

// pipe read & write operation
// read repl.txt file's content,then write content into output.txt
readerStream.pipe(writerStream);

console.log('the program is end\n');
*/

/* 链式流
 * 
 * 链式是通过链接输出流到另一个流并创建多个对流操作链的机制。
 * 链式流一般用于管道操作
 * 
 */

// 实例，通过管道流和链式流来压缩和解压文件

let fs = require('fs');
let zlib = require('zlib');

// compress repl.txt to repl.txt.gz
fs.createReadStream('repl.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('repl.txt.gz'));

console.log('the program is end\n');


