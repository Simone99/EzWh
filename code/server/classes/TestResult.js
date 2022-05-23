const dayjs = require('dayjs');
class testResult {
	constructor(idTestDescriptor, result, date, id) {
		this.id = id;
		this.date = date;
		this.idTestDescriptor = idTestDescriptor;
		this.result = result;
	}

	getResult() {
		return this.result;
	}
}

module.exports = testResult;
