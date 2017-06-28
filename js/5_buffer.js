// JavaScript 中只有字符串数据类型，没有二进制数据类型

// NodeJS 中定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区

// Buffer 库为 NodeJS 带来了一种存储原始数据类型的方法，可以让 NodeJS 处理二进制数据，每当需要在 NodeJS 中处理 I/O 操作中移动的数据时，就可能使用 Buffer 库。原始数据存储在 Buffer 库的实例中

// 一个 Buffer 类类似于一个整形数组，蛋挞对应于 V8 堆内存之外的一块原是内存

/* 创建 Buffer 类
 */

let buf;

// method 1, create a Buffer living example which length is 10 Bytes
buf = new Buffer(10);

// method 2, create a buffer living example by a given array
buf = new Buffer([10, 20, 30, 40, 50]);

// method 3, create a buffer living example by a string
buf = new Buffer("blog.lupath.com", "utf-8");

// utf-8 是默认的编码方式，此外它同时支持一下编码:"ascii","utf-8","utf16le","usc2","base64","hex"

/* 写入缓冲区
 * 
 * 语法: buf.write(string[, offset][, length][, encoding])
 * 
 * 参数:
 * string-写入缓冲区的字符串
 * offset-缓冲区开始写入的索引值，默认为0
 * length-写入的字节书，默认为 buffer.length
 * encoding-使用的编码方法，默认为"utf-8"
 * 
 * 返回值:实际写入的大小。如果 buffer 空间不在，则只会写入部分字符串
 * 
 */

// 实例
buf = new Buffer(256);
len = buf.write("blog.lupath.com");

console.log("writed bytes is:" + len);

/* 从缓冲区独处数据
 * 
 * 语法: buf.toString([encoding[, start[, end]]])
 * 
 * 参数:
 * encoding-使用的编码，默认为"utf-8"
 * start-指定开始读取的索引位置，默认为0
 * end-结束位置，默认为缓冲区的末尾
 * 
 * 返回值:解码缓冲区数据并使用指定的编码返回字符串
 * 
 */

// 实例
buf = new Buffer(26);
for(let i = 0; i < 26; i++){
	buf[i] = i + 97;
}

console.log(buf.toString('ascii'));
console.log(buf.toString('ascii', 0, 5));
console.log(buf.toString('utf-8', 0, 5));
console.log(buf.toString(undefined, 0, 5));

/* 将 Buffer 转换成 JSON 对象
 * 
 * 语法: buf.toJSON()
 * 
 * 返回值: JSON 对象
 * 
 */

// 实例
buf = new Buffer('blog.lupath.com');
let json = buf.toJSON(buf);

console.log(json);

/* 缓冲区合并
 * 
 * 语法: Buffer.concat(list[, totalLength])
 * 
 * 参数:
 * list-用于合并的 Buffer 对象数组列表
 * totalLength-指定合并后 Buffer 对象的总长度
 * 
 * 返回值:
 * 一个多个成员合并的新 Buffer 对象
 * 
 */

// 实例
let buffer1 = new Buffer("陆浩");
let buffer2 = new Buffer("blog.lupath.com");
let buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3's content:" + buffer3.toString());

/* 缓冲区比较
 * 
 * 语法: buf.compare(otherBuffer)
 * 
 * 参数: 
 * otherBuffer-与 buf 对象比较的另一个 Buffer 对象
 * 
 * 返回值:
 * 一个数字，表示 buf 在 otherBuffer 之前，之后或者相同
 * 
 */

// 实例
buffer1 = new Buffer('ABC');
buffer2 = new Buffer('ABCD');
let result = buffer1.compare(buffer2);

if(result < 0){
	console.log(`${buffer1}在${buffer2}之前`);
}else if(result === 0){
	console.log(`${buffer1}与${buffer2}相同`);
}else{
	console.log(`${buffer1}在${buffer2}之后`);
}

/* 拷贝缓冲区
 * 
 * 语法: buf.copy(targetBuffer[, targetstart[, sourceStart[, sourceEnd]]])
 * 
 * 参数:
 * targetBuffer-要拷贝的 Buffer 对象
 * targetStart-数字，可选，默认为 0
 * SourceStart-数字，可选，默认为 0
 * SourceEnd-数字，可选，默认为 buffer.length
 * 
 * 返回值:
 * 没有返回值
 * 
 */

// 实例
buffer1 = new Buffer('ABC');
buffer2 = new Buffer(3);
console.log(`buffer2 content:${buffer2.toString()}`);
buffer1.copy(buffer2);
console.log(`buffer2 content:${buffer2.toString()}`);

/* 缓冲区裁剪
 * 
 * 语法: buf.slice([start, [end]])
 * 
 * 参数:
 * start-数字，可选，默认为 0
 * end-数字，可选，默认为 buffer.length
 * 
 * 返回值:
 * 一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切
 * 
 */

// 实例
buffer1 = new Buffer('lupath');
buffer2 = buffer1.slice(0, 2);
console.log(`buffer2 content:${buffer2.toString()}`);

/* 缓冲区长度
 * 
 * 语法: buf.length
 * 
 * 返回值:
 * Buffer 对象所占据的内存长度
 * 
 */

//实例
buffer1 = new Buffer('blog.lupath.com');
console.log(`buffer1 length is ${buffer1.length}`);

