const SKU = require("./SKU");
class InternalOrderItem{
    constructor(SKU, qty){
        this.SKUObj = SKU;
        this.qty = qty;
    }

    getSKU() {
		return this.SKUObj;
	}

    getQuantity() {
        return this.qty;
    }
}

module.exports = InternalOrderItem;