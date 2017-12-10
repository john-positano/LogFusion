var fs = require('fs');
var events = require('events');

var $_SCANTIME = process.env.LOG_SCAN_INTERVAL || 500;
var $_DEFAULTDIRECTORY = process.env.LOG_DIRECTORY || '/Applications/ColdFusion2016/cfusion/logs';

class LogEventEmitter extends events.EventEmitter {
	constructor (directory = $_DEFAULTDIRECTORY) {
		super();
		events.EventEmitter.call(this);

		var self = this;

		self._directory = directory;
		self._watchers = [];
		self._directoryListingArray = [];

		self._directoryListingArray = fs.readdirSync(self._directory);

		for (var log of self._directoryListingArray) {
			self._watchers.push(
				fs.watchFile(
					`${self._directory}/${log}`,
					{ interval: $_SCANTIME },
					function () {
						self.emit(
							'diff', 
							{
								file: log,
								arguments: arguments
							}
						);
					}
				)
			);
		}
	}
};

LogEventEmitter.prototype.setDirectory = (directory = $_DEFAULTDIRECTORY) => {
	LogEventEmitter._directory = directory;
};

LogEventEmitter.prototype.watch = () => {
	LogEventEmitter._watchers = {};
	LogEventEmitter._directoryListingArray = [];
	LogEventEmitter._directoryListingArray = fs.readdirSync(LogEventEmitter._directory);

	for (var log of LogEventEmitter._directoryListingArray) {
		LogEventEmitter._watchers[log] = (
			fs.watchFile(
				`${LogEventEmitter._directory}/${log}`,
				{ interval: $_SCANTIME },
				function () {
					// LogEventEmitter.emit('diff', arguments);
					console.log(this);
				}
			)
		);
	}
};

module.exports = LogEventEmitter;