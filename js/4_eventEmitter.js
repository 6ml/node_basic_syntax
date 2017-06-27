// NodeJS 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列
// 所有产生事件的对象都是 events.EventEmitter 的实例

// EventEmitter 类
// events 模块只提供了一个对象: events.EventEmitter
// EventEmitter 的核心就是事件触发与事件监听器功能的封装

// EventEmitter 对象如果在实例化时发生错误，会出发 error 事件
// 当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件会被触发

/* EventEmitter 的每个事件由一个事件名和若干个参数组成
 * 事件名是一个字符串，通常表达一定的语义
 * 事件参数作为回调函数参数传递
*/
// 对于每个事件，EventEmitter 支持若干个事件监听器
// 当事件触发时，注册到这个事件的事件监听器被依次调用

let events = require('events');
let emitter = new events.EventEmitter();

// bind eventHandler
emitter.on('someEvent', (arg1, arg2) => {
	console.log('listener1:', arg1, arg2);
});

// bind another eventHandler on the same event
emitter.on('someEvent', (arg1, arg2) => {
	console.log('listener2:', arg1, arg2);
});

// trigger event
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');

