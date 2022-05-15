const dayjs = require("dayjs");
const TestResult = require("./TestResult");
class SKUItem {
	constructor(SKUid, available = false, dateOfStock = null, RFID = undefined) {
		this.rfid = RFID;
		this.available = available;
		this.SKUid = SKUid;
		this.dateOfStock = dateOfStock;
	}


	getSKUId() {
		return this.SKUid;
	}

	getSKU_RFID() {
		return this.rfid;
	}
	
	getDateOfStock(){
		return this.dateOfStock;
	}

}

module.exports = SKUItem;
