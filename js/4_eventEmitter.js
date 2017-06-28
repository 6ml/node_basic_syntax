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

/* 事件触发原理
 * EventEmitter 实例对象通过 on 方法注册事件 ** 的监听器
 * 向 EventEmitter 实例对象发送事件 ** ，就会调用 ** 事件的监听器
 */

//传参实例

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


/*实例对象方法
 *
 * addListener(event, listener);
 * 为指定事件添加一个监听器到监听器数组的尾部
 * 
 * on(event, listener)
 * 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数
 *
 * once(event, listener)
 * 为指定事件注册一个单次监听器，该监听器最多只会触发一次，触发后立即接触该监听器
 *
 * removeListener(event, listener)
 * 移除指定事件的某个监听器，监听器必须是该事件已注册过的监听器
 *
 * removeAllListener([event])
 * 移除所有事件[指定事件]的所有监听器
 *
 * setMaxListener(n)
 * 设置实例对象最大监听器数量，默认情况超过 10 个就会输出警告信息
 * 
 * listener(event)
 * 返回指定事件的监听器数组
 * 
 * emit(event, [arg1], [arg2], [...])
 * 按参数顺序执行每一个监听器，如果事件有监听器注册返回 true ，否则返回 false
 *
 */

/*类方法
 *
 * listenerCount(emitter, event)
 * 返回指定事件的监听器数量
 *
 */

/*事件
 * 
 * newListener
 * 参数:
 * event-字符串，事件名称
 * listener-处理事件函数
 * 该事件在添加新监听器时被触发
 * 
 * removeListener
 * 参数:
 * event-字符串，事件名称
 * listener-处理事件函数
 * 从指定监听器数组中删除一个监听器。注意:此操作会改变处于被删除监听器之后的那些监听器的索引
 * 
 */

// 实例
events = require('events');
var eventEmitter = new events.EventEmitter();

// monitor #1
let listener1 = () => {
	console.log('monitor listener1 execute');
}

// monitor #2
let listener2 = () => {
	console.log('monitor listener2 execute');
}

// bind connection event, eventHandler is listener1
eventEmitter.on('connection', listener1);

// bind connection event, eventHandler is listener2
eventEmitter.on('connection', listener2);

let eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(`${eventListeners} monitors monitor the connection event which on eventEmitter object`);

// trigger connection event
eventEmitter.emit('connection');

// remove monitor on connection event which handler is listener1
eventEmitter.removeListener('connection', listener1);
console.log("listener1 do not monitor anymore");

// triger connection event
eventEmitter.emit('connection');

 
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(`${eventListeners} monitors monitor the connection event which on eventEmitter object`);

console.log('the program is end');

/* error 事件
 *
 * EventListener 定义了一个特殊的事件 error ，它包括了错误的予以，我们在遇到异常的时候通常会触发 error 事件
 * 当 error 被触发时，EventListener 规定**如果没有响应的监听器，NodeJS 会把它当做异常，退出程序并输出错误信息**
 * 一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃
 *
 */

events = require('events');
emitter = new events.EventEmitter();
emitter.emit('error');

/* 继承 EventEmitter
 * 
 * 大多数时候不会直接使用 EventEmitter，而是在对象中继承它。
 * 包括 fs 、net 、http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类
 * 
 * 这样做的原因：
 * 首先，具有某个实体功能的对象实现事件符合予以，事件的监听和发射应该是一个对象的方法
 * 其次 JavaScript 的对象机制是基于原型的，支持部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系
 * 
 */
