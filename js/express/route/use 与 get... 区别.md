### express.static

用于指定静态资源根目录，指定以后就可以直接在 url 中输入静态资源相对指定目录的地址即可访问。

### app.route / router.route

可用于一次性为一个路由新增多个动作

### app.param / router.param

可对接受到的 params 进行验证并处理

参数：
-	req
-	res
-	next
-	param

### app.view

用于处理模板

### app.use 与 app.get 区别

#### app.get

参数: 

-	path
-	callback
-	[, callback ...]

**回调函数有多个时，按代码顺序执行；如果参数是数组时，按数组顺序执行**。

#### app.use

参数:

-	path
-	function / Router 实例对象 / express() 实例对象
-	[, function ...]

`use`**参数可以是多个函数、数组、**`router`**对象，或是他们的组合**。