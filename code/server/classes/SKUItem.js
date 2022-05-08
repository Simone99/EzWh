const dayjs = require("dayjs");
const TestResult = require("./TestResult");
class SKUItem {
	constructor(SKUid, available = false, dateOfStock = null, RFID = undefined) {
		this.rfid = RFID; // need to discuss the value in the meeting
		this.available = available;
		this.SKUid = SKUid;
		this.dateOfStock = dateOfStock;
		this.testResultsList = [];
	}
	//Methods
	setRFID(rfid) {
		this.rfid = rfid;
		return;
	}

	setAvailable(available) {
		this.available = available;
		return;
	}

	setDateOfStock(dateOfStock) {
		this.dateOfStock = dayjs(dateOfStock, "YYYY/MM/DD");
		return;
	}

	isAvailable() {
		return this.available;
	}

	getSKUId() {
		return this.SKUid;
	}

	addTestResult(description, result) {
		let testResult = new TestResult(description, result);
		this.testResultsList.push(testResult);
		return;
	}

	editTestResult(id, newTestDescriptor, newDate, newResult) {
		// a wrapper function  will be used to get the newTestDescriptor object using its ID
		let index = this.testResultsList.indexOf((r) => r.id === id);
		this.testResultsList[index].setDescription(newTestDescriptor);
		this.testResultsList[index].setDate(dayjs(newDate, "YYYY/MM/YY"));
		this.testResultsList[index].setResult(newResult);
		return;
	}

	deleteTestResult(id) {
		let index = this.testResultsList.indexOf((r) => r.id === id);
		this.testResultsList.splice(index, 1);
		return;
	}

	getTestResultList() {
		return this.testResultsList;
	}

	getTestResult(id) {
		let index = this.testResultsList.indexOf((r) => r.id === id);
		return this.testResultsList[index];
	}

	hasAllPositiveTestResults() {
		return this.testResultsList.every((r) => r.getTestResult() === true);
	}

	getSKU_RFID() {
		return this.rfid;
	}

	getDateOfStock(){
		return this.dateOfStock;
	}
}

module.exports = SKUItem;
