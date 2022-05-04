const SKU = require("./SKU");
class InternalOrderItem{
    constructor(SKU, quantity){
        this.SKUObj = SKU;
        this.quantity = quantity;
    }

    setSKU(SKU) {
        this.SKU = SKU;
        return;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
        return;
    }

    getSKU() {
		return this.SKUObj;
	}

    getQuantity() {
        return this.quantity;
    }
}

module.exports = InternalOrderItem;