class logEventService {
	constructor (href) {
		this.socket = io(href);
	}
}