const express = require('express');

let app = express();
let router = express.Router();

router.get('/hello/:name', (req, res) => {
	res.send(`hello ${req.params.name} !`);
});

app.use('/', router);

app.listen(8080, () => {
	console.log('the server is running at 127.0.0.1:8080...');
});
