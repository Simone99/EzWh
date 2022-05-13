const dayjs = require("dayjs");
const RestockOrderItem = require("./RestockOrderItem");
const TransportNote = require("./TransportNote");
const Item = require('./Item');
const SKUItem = require('./SKUItem');
class restockOrder {
	constructor(supplierID, state = null, id = null) {
		this.id = id;
		this.issueDate = dayjs();
		this.deliveryDate = dayjs();
		this.state = state;
		this.supplierID = supplierID;

	}

}

module.exports = restockOrder;
