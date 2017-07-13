const express = require('express');

let app = express();
let router = express.Router();

router.param('name', (req, res, next, name) => {

	console.log(`doing name validations on ${name}`);
	
	// do some validation
	if(name === "lupath"){
		req.name = name;
	}

	next();
});

router.get('/hello/:name', (req, res) => {
	res.send(`hello ${req.name} !`);
});

app.use('/', router);

app.listen(8080, () => {
	console.log('the server is running at 127.0.0.1:8080...');
});
