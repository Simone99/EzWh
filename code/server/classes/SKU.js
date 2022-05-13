const SKUItem = require("./SKUItem");
class SKU {
	constructor(
		description,
		weight,
		volume,
		price,
		notes = null,
		position = null,
		id = null,
		availableQuantity = 0
	) {
		this.id = id;
		this.description = description;
		this.weight = weight;
		this.volume = volume;
		this.price = price;
		this.notes = notes;
		this.pos = position;
		this.availableQuantity = availableQuantity;
	}

	getPosition() {
		return this.pos;
	}

	getDescription(){
		return this.description;
	}

	getWeight(){
		return this.weight;
	}

	getVolume(){
		return this.volume;
	}

	getNotes(){
		return this.notes;
	}

	getPrice(){
		return this.price;
	}
}

module.exports = SKU;
