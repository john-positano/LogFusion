require('dotenv').config();

var express = require('express');
const api = express();
const fs = require('fs');

api.use(
	'/', 
	[
		express.static(`${__dirname}/../app/public`),
		express.static(`${__dirname}/../app/public/images`)
	]
);

api.use(
	'/node_modules',
	express.static(`${__dirname}/../node_modules`)
);


module.exports = api;