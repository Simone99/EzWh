const SKU = require("./SKU");
class InternalOrderItem{
    constructor(SKU, quantity){
        this.SKUObj = SKU;
        this.quantity = quantity;
    }

    getSKU() {
		return this.SKUObj;
	}

    getQuantity() {
        return this.quantity;
    }
}

module.exports = InternalOrderItem;