//NodeJS 是单线程单进程应用程序，但是通过事件和回调支持并发
//NodeJS 每个 API 都是异步的，并且作为一个独立线程运行，使用异步函数调用，并处理并发
//NodeJS 基本所有的事件机制都是用设计模式中观察者模式实现

// import events module
let events = require('events');
// create eventEmitter Object
let eventEmitter = new events.EventEmitter();

// create eventHandler
let connectHandler = connected = () => {
	console.log('connect successfully');

	// trigger data_received event
	eventEmitter.emit('data_received');
};

// bind connection eventHandler
eventEmitter.on('connection', connectHandler);

// use anonymous function to bind data_received event
eventEmitter.on('data_received', () => {
	console.log('received data successfully');
});

// trigger connection event
eventEmitter.emit('connection');

console.log('the process is end\n');

