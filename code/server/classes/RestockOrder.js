const dayjs = require("dayjs");
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat);
const RestockOrderItem = require("./RestockOrderItem");
const TransportNote = require("./TransportNote");
const Item = require('./Item');
const SKUItem = require('./SKUItem');

class restockOrder {
	constructor(id, issueDate, state, supplierId, transportNote) {
		this.id = id;
		this.issueDate = issueDate;
		this.state = state;
		this.supplierId = supplierId;
		this.transportNote = transportNote;
		this.products = [];
		this.SKUItems = [];
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
		this.transportNote = tNote;
		return;
	}

	setReturnOrder(returnOrder) {
		//new method
		this.returnOrder = returnOrder;
		return;
	}

	addSKUItems(SKUitem) {
		SKUitem.forEach(skuItem => this.SKUItems.push(skuItem));
	}

	getAllSKUItems() {
		return this.SKUItems;
	}

	getState() {
		return this.state;
	}

	getIssueDate(){
		return this.issueDate;
	}

	getID(){
		return this.id;
	}

	addProducts(products){
		products.forEach(product => this.products.push(product));
	}
}

module.exports = restockOrder;
