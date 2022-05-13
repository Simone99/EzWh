const dayjs = require("dayjs");
class testResult {
	constructor(description, result, date, id=null) {
		this.id = id;
		this.date = date;
		this.description = description;
		this.result = result;
	}
	//Methods
	setDate(date) {
		this.date = dayjs(date, "YYYY/MM/DD");
		return;
	}

	setDescription(description) {
		this.description = description;
	}

	setResult(result) {
		this.result = result;
		return;
	}

	getTextDescriptor() {
		return this.description;
	}

	getResult() {
		return this.testResult;
	}

	testResult(testValue) {
		return this.result === testValue;
	}
}

module.exports = testResult;
