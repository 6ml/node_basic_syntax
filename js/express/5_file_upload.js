/**
 * 文件上传
 */

let express = require('express');
let app = express();
let fs = require('fs');

let bodyParser = require('body-parser');
let multer = require('multer');

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: false }));
// appoint the directory that files upload
app.use(multer({ dest: './'}).array('image'));

app.get('/upload.html', (req, res) => {
	res.sendFile(`${__dirname}/upload.html`);
})

app.post('/file_upload', (req, res) => {
	// uploaded file info
	console.log(req.files[0]);

	let des_file = `${__dirname}/${req.files[0].originalname}`;
	fs.readFile( req.files[0].path, (err, data) => {
		fs.writeFile(des_file, data, (err) => {
			if(err){
				console.log(err);
			}
			else{
				response = {
					message: 'File uploaded successfully',
					filename: req.files[0].originalname
				};
			}

			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});

let server = app.listen(8080, () => {
	console.log('the server is running at http://172.0.0.1:8080...');
});
