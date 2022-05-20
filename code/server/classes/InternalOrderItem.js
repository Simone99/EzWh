const SKU = require("./SKU");
class InternalOrderItem{
    constructor(SKU, qty, description){
        this.SKUObj = SKU;
        this.qty = qty;
        this.description = description;
    }

    getSKU() {
		return this.SKUObj;
	}

    getQuantity() {
        return this.qty;
    }

    getDescription(){
        return this.description;
    }
}

module.exports = InternalOrderItem;