const SKUItem = require("./SKUItem");
class SKU {
	constructor(
		description,
		weight,
		volume,
		price,
		notes = null,
		position = null
	) {
		this.id; //initailize it to its id from db
		this.description = description;
		this.weight = weight;
		this.volume = volume;
		this.price = price;
		this.notes = notes;
		this.pos = position;
		this.SKUItemsList = [];
		this.availableQuantity = this.skuItemList.length;
		this.itemsList = [];
	}
	//Methods
	setDescription(value) {
		this.description = value;
		return;
	}

	setWeight(value) {
		this.weight = value;
		return;
	}

	setVolume(value) {
		this.volume = value;
		return;
	}

	setPrice(value) {
		this.price = value;
		return;
	}

	setNotes(value) {
		this.notes = value;
		return;
	}

	setPosition(pos) {
		this.pos = pos;
		return;
	}

	setAvailableQuantity(value) {
		this.availableQuantity = value;
		return;
	}

	increaseAvailableQuantity(value) {
		this.availableQuantity += value;
		return;
	}

	getavailableQuantity() {
		return this.availableQuantity;
	}

	getPosition() {
		return this.pos;
	}

	getSKUItemsList() {
		return this.SKUItemsList;
	}

	getAvailableSKUItems() {
		return this.SKUItemsList.filter((skuItem) => skuItem.available === true);
	}

	addSKUItem(available = false, dateOfStock = null) {
		//added parameters
		let skuItem = new SKUItem(this.id, available, dateOfStock);
		this.SKUItemsList.push(skuItem);
		return;
	}

	editSKUItem(rfid, newRFID, newAvailable, newDate) {
		//added parameters
		let index = this.SKUItemsList.index((s) => s.getSKU_RFID() === rfid);
		let skuItem = this.SKUItemsList[index];
		skuItem.setRFID(newRFID);
		skuItem.setAvailable(newAvailable);
		skuItem.setDateOfStock(newDate);
		return;
	}

	deleteSKUItem(rfid) {
		let index = this.SKUItemsList.findIndex((skuItem) => skuItem.rfid === rfid);
		this.SKUItemsList.splice(index, 1);
		return;
	}

	getItemsList() {
		return this.itemsList;
	}

	addItem(item) {
		// this implementation assumes that the item object is already created with all details and just needs to be linked with the propper SKU
		this.itemsList.push(item);
		return;
	}
}

module.exports = SKU;
