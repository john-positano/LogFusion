const httpApi = require('./httpApi/api');
const httpApiServerPort = 10101;

const wsApi = require('./wsApi/api');
const wsApiServerPort = 10110;

const opn = require('opn');
const fs = require('fs');
const sliceFile = require('slice-file');
const nodeSass = require('node-sass');

const LogWatch = require('./modules/_logWatch');

var logWatch = new LogWatch();

console.log('Compiling Sass..');
try {
	for (var sassFile of fs.readdirSync(`${__dirname}/app/public/styles`).filter(style => style.match(/.scss/))) {
		fs.writeFileSync(
			file = `${__dirname}/app/public/styles/${sassFile.replace('.scss','.css')}`,
			nodeSass.renderSync({
				data: fs.readFileSync(`${__dirname}/app/public/styles/${console.log(`Writing ${file}`), sassFile}`).toString()
			}).css
		);
	}
} catch (e) {
	console.log('Error Compiling Sass!', e);
}

httpApi.Server = httpApi.listen(
	httpApiServerPort,
	() => {
		console.log(`LogFusion HTTP API Server listening on port ${httpApiServerPort}`);
	}
);

wsApi.Server = new wsApi.createServer(
	httpApi.Server,
	logWatch,
	() => {
		console.log(`LogFusion WebSocket API Server listening off of HTTP API Server on port 10101`);		
	}
);