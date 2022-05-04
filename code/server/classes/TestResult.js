const dayjs = require("dayjs");
class testResult {
	constructor(description, result) {
		this.id; // to be initialized from db index value
		this.date = dayjs();
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
