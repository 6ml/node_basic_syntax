function Hello() {
	let name;
	this.setName = theName => {
		name = theName;
	};
	this.sayHello = () => {
		console.log(`Hello ${name}`);
	};
};

module.exports = Hello;
