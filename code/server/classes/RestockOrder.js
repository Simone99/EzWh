const dayjs = require("dayjs");
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat);
const RestockOrderItem = require("./RestockOrderItem");
const TransportNote = require("./TransportNote");
const Item = require('./Item');
const SKUItem = require('./SKUItem');
class restockOrder {
	constructor(id, state, userID, transportNote) {
		this.id = id;
		this.issueDate = dayjs();
		this.deliveryDate = null;
		this.state = state;
		this.userID = userID;
		this.transportNote = transportNote;
		this.SKUItemsList = [];
	}

	getID() {
		return this.id;
	}

	addRestockOrderItem(item, quantity) {
		let roi = new RestockOrderItem(item, quantity); //can be changed based on the constructor
		this.restockOrderItemsList.push(roi);
		return;
	}

	deleteRestockOrderItem(itemID) {
		//changed the argument from item type to int itemID since item has an id
		let index = this.restockOrderItemsList.indexOf((i) => i.id === itemID);
		this.restockOrderItemsList.splice(index, 1);
		return;
	}

	editSupplier(supplierID) {
		this.supplierID = supplierID;
		return;
	}

	issue() {
		this.state = "issue";
		this.issueDate = dayjs(); //change also the issue day to the moment the issue function is called
		return;
	}

	changeState(state) {
		this.state = state;
		return;
	}

	createTagSKUItems() {
		for(let roi in this.restockOrderItemsList){
			let itm = roi.getItmObj();
			let tmp = new SKUItem(itm.getSKUId(), true);
			this.addSKUItems(tmp);
		}
		return;
	}

	getTransportNote() {
		return this.transportNote;
	}

	setTransportNote(tNote) {
		//in the TransportNote class need methods to add shipmentDate and editNote
		this.transportNote = new TransportNote(tNote);
		return;
	}

	setReturnOrder(returnOrder) {
		//new method
		this.returnOrder = returnOrder;
		return;
	}

	getSKUItems() {
		//need to know the return order associated with this restock order if there is any
		//so added a property to include the return order
		// In the return order class need to a method returnOrder.getSKUitemsList()
		return this.returnOrder.getSKUItemsList();
	}

	addSKUItem(SKUitem) {
		this.SKUItemsList.push(SKUitem);
		return;
	}

	getAllSKUItems() {
		return this.SKUItemsList;
	}

	getState() {
		return this.state;
	}

	getIssueDate(){
		return this.issueDate;
	}

	getDeliveryDate(){
		return this.deliveryDate;
	}

}

module.exports = restockOrder;
