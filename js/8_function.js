/* NodeJS 函数
 * 
 * NodeJS 中函数使用与 JavaScript 类似
 * 可以将函数作为另一个函数的参数进行传递，也可以在传递参数的地方直接定义函数
 * 
 */

say = world => {
	console.log(world);
};

execute = (someFunction, value) => {
	someFunction(value);
};

execute(say, 'Hello');

/* 匿名函数
 */

/*
execute = (someFunction, value) => {
	someFunction(value);
};
*/

execute(world => {
	console.log(world);
}, "Hello");

