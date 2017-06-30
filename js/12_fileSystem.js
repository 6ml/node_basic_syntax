/* 文件系统
 * 
 * NodeJS 提供一组类似 UNIX(POSIX) 标准的文件操作 API
 * 
 */


/* 异步和同步
 * 
 * NodeJS 文件系统(fs 模块)中的方法均分为异步和同步版本
 * 
 * 异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息
 * 
 * 推荐使用异步方法，比起同步，它性能更高，速度更快，而且没有阻塞
 * 
 */



/* 打开文件
 * 
 * 语法: fs.open(path, flags[, mode][, callback])
 * 
 * 参数:
 * path - 文件的路径
 * flags - 文件打开的行为，如读/写/追加
 * mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)
 * callback - 回调函数，带有两个参数，如: callback(err, fd)
 * 
 */

// 实例

/*
let fs = require('fs');

// 异步打开文件
console.log('准备打开文件');

fs.open('repl.txt', 'r+', (err, fd) => {
	if(err){
		console.error(err);
	}
	console.log("文件打开成功");
});
*/


/* 获取文件信息
 * 
 * 语法: fs.stat(path, callback) (异步方式)
 * 
 * 参数:
 * path - 文件路径
 * callback - 回调函数，带有两个参数，如: callback(err, stats)，stats 是 fs.Stats 对象
 * 
 * fs.stat(path) 执行后，会将 stats 类的实例返回给其回调函数
 * 可以通过 stats 类中提供的方法判断文件的相关属性 
 * 
 * stats 类中方法:
 * stats.isFile() - 判断文件
 * stats.idDirectory() - 判断目录
 * stats.isBlockDevice() - 判断块设备
 * stats.isCharacterDevice() - 判断字符设备
 * stats.isSymbolicLink() - 判断软链接
 * stats.isFIFO() - 判断 FIFO ，FIFO 是 UNIX 中的一种特殊类型的命令管道
 * stats.isSocket() - 判断 Socket
 *
 */

// 实例

/*
let fs = require('fs');

console.log('准备打开文件');

fs.stat('express', (err, stats) => {
	if(err){
		return console.error(err);
	}
	console.log(stats);
	console.log('读取文件信息成功');

	// 检测文件类型
	console.log('是否为文件(isFile)?' + stats.isFile());
	console.log('是否为目录(isDirectory)?' + stats.isDirectory());
});
*/

 /* 写入文件
 * 
 * 语法: fs.writeFile(file, data[, options], callback)
 * 
 * 参数:
 * file - 文件名或文件描述符
 * data - 要写入的数据，可以是 String (字符串)或者 Buffer (流)对象
 * options - 该参数是一个对象，包含 {encoding, mode, flag}默认编码为 utf8 ，模式为 0666 ，flag 为'w'
 * callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回
 *
 * 如果文件存在，该方法写入的内容会覆盖旧的文件内容
 * 
 */

// 实例

/*
let fs = require('fs');

console.log('准备写入文件');

fs.writeFile('output.txt', '我是通过写入的文件内容', (err) => {
	if(err){
		return console.error(err);
	}
	console.log('数据写入成功\n------------\n读取写入的数据');
	fs.readFile('output.txt', (err, data) => {
		if(err){
			return console.error(err);
		}
		console.log('异步读取文件数据:' + data.toString());
	});
});
*/

/* 读取文件
 * 
 * 语法: fs.read(fd, buffer, offset, length, position, callback)
 * 
 * 参数:
 * fd - 通过 fs.open() 方法打开的文件描述符
 * buffer - 数据写入的缓冲区
 * offset - 缓冲区写入的写入偏移量
 * length - 要从文件中读取的字节数
 * position - 文件读取的起始位置
 * callback - 回调函数，有三个参数: err , bytesRead , buffer
  。err 为错误信息，bytesRead 表示读取的字节数，buffer 为缓冲区对象
 *
 */

// 实例 
/*
let fs = require('fs');
let buf = new Buffer(1024);

console.log('准备打开已经存在的文件');

fs.open('repl.txt', 'r+', (err, fd) => {
	if(err){
		return console.error(err);
	}

	console.log('文件打开成功\n准备读取文件\n');
	
	fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
		if(err){
			return console.error(err);
		}
		console.log(bytes + "字节被读取");

		// 仅输出读取的字节
		if(bytes > 0){
			console.log(buf.slice(0, bytes).toString());
		}
	});
});
*/


/* 关闭文件
 * 
 * 语法: fs.close(fd, callback) 异步模式下
 * 
 * 参数:
 * fd - 通过 fs.open() 打开的文件描述符
 * callback - 回调函数，一个参数: err
 * 
 */

// 实例
/*
let fs = require('fs');
let buf = new Buffer(1024);

console.log('准备打开文件');

fs.open('repl.txt', 'r+', (err, fd) => {
	if(err){
		return console.error(err);
	}

	console.log('文件打开成功\n准备读取文件');

	fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
		if(err){
			return console.error(err);
		}

		// 仅输出读取的字节
		if(bytes > 0){
			console.log(buf.slice(0, bytes).toString());
		}

		// 关闭文件
		fs.close(fd, (err) => {
			if(err){
				return console.error(err);
			}
			console.log('文件关闭成功');
		});
	});
});
*/

/* 截取文件
 * 
 * 语法: fs.ftruncate(fd, len, callback)
 * 
 * 参数:
 * fd - 通过 fs.open() 方法返回的文件描述符
 * len - 文件内容截取的长度
 * callback - 回调函数，一个参数: err
 * 
 */

// 实例

/*
let fs = require('fs');
let buf = new Buffer(1024);

console.log('准备打开文件');

fs.open('repl.txt', 'r+', (err, fd) => {
	if(err){
		return console.error(err);
	}

	console.log('文件打开成功\n截取10字节的文件内容');

	// 截取文件
	fs.ftruncate(fd, 10, (err) => {
		if(err){
			return console.error(err);
		}

		console.log('文件截取成功');
		console.log('读取相同的文件');

		fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
			if(err){
				return console.error(err);
			}
			
			console.log('读取相同文件成功');

			// 仅输出读取的字节
			if(bytes > 0){
				console.log(buf.slice(0, bytes).toString());
			}

			// 关闭文件
			fs.close(fd, (err) => {
				if(err){
					return console.error(err);
				}
				console.log('文件关闭成功');
			});
		});
	});
});
*/

/* 删除文件
 * 
 * 语法: fs.unlink(path, callback)
 * 
 * 参数:
 * path - 文件路径
 * callback - 回调函数，一个参数: err
 * 
 */


/* 创建目录
 * 
 * 语法: fs.mkdir(path[, mode], callback)
 * 
 * 参数:
 * path - 文件路径
 * mode - 设置目录权限，默认为 0777
 * callback - 回调函数，一个参数: err
 * 
 */


/* 读取目录
 * 
 * 语法: fs.readdir(path, callback)
 * 
 * 参数:
 * path - 文件路径
 * callback - 回调函数，两个参数: err ，files ，files为目录下的文件数组列表
 * 
 */


/* 删除目录
 * 
 * 语法: fs.rmdir(path, callback)
 * 
 * 参数:
 * path - 文件路径
 * callback - 回调函数，一个参数: err
 * 
 * 目录不为空时报错
 *
 */

// 实例
let fs = require('fs');

// 先创建目录
fs.mkdir('./test/', (err) => {
	if(err){
		return console.error(err);
	}

	console.log('目录创建成功\n准备在该目录下写入文件');

	// 写入文件

	fs.writeFile('./test/write.txt', '我是通过写入的文件内容', (err) => {
		if(err){
			return console.error(err);
		}

		console.log('文件写入成功\n准备打开该文件');

		// 打开该文件

		fs.open('./test/write.txt', 'r+', (err, fd) => {
			if(err){
				return console.error(err);
			}

			console.log('文件打开成功\n准备读取文件内容');
			let buf = new Buffer(1024);

			fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
				if(err){
					return console.error(err);
				}

				console.log(bytes + "个字节被读取");

				// 仅输出读取的字节
				if(bytes > 0){
					console.log(buf.slice(0, bytes).toString());
				}

				console.log('准备关闭该文件');

				// 关闭文件
				fs.close(fd, (err) => {
					if(err){
						return console.error(err);
					}

					console.log('文件关闭成功\n准备读取目录内容并删除文件');
					
					fs.readdir('./test/', (err, files) => {
						if(err){
							return console.error(err);
						}

						console.log('目录内容如下:');

						files.forEach((file, index) => {
							console.log('第 ' + (index + 1) + " 个文件是 " + file);

							// 删除该文件
							
							console.log('删除该文件');

							fs.unlink('./test/' + file, (err) => {
								if(err){
									return console.error(err);
								}

								console.log('文件删除成功');

								console.log('文件已删除\n准备删除目录');

								// 删除目录
								fs.rmdir('./test/', (err) => {
									if(err){
										return console.error(err);
									}

									console.log('目录删除成功');

								});
							});
						});
					});
				});
			});
		});
	});
});

/*
 * 多重函数调用非常混乱，还是用 promise 吧 ->_-> 
 */


