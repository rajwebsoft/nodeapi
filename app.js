const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const http = require('http');
const bodyParser = require('body-parser');
const expressFileupload =require('express-fileupload');

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressFileupload());

// ************* Enable CORS *******************************
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
	if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    }
	next();
});

app.use('/', require('./routes/index.js'));
const server = http.createServer(app).listen(port,function(){
	console.log('Development Server is running on :' + port);
});