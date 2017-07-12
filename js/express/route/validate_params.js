const express = require('express');

let app = express();
let router = express.Router();

router.param('name', (req, res, next, name) => {
	// do some validation

	console.log(`doing name validations on ${name}`);

	req.name = name;

	next();
});

router.get('/hello/:name', (req, res) => {
	res.send(`hello ${req.name} !`);
});

app.use('/', router);

app.listen(8080, )
