const dayjs = require("dayjs");
class testResult {
	constructor(description, result, date, id=null) {
		this.id = id;
		this.date = date;
		this.description = description;
		this.result = result;
	}

}

module.exports = testResult;
