class Item {

    SKU = require('./SKU');
    Supplier = require('./Supplier');

    constructor(description, price, supplierID, SKUId) {
        this.id //autogenereted(?);
        this.description = description;
        this.price  = price;
        this.supplierID = supplierID;
        this.SKUId = SKUId;
    }

    getSKUId() {
        return this.SKUId;
    }

    setDescription(description) {
        this.description = description;
        return;
    }

    setPrice(price) {
        this.price = price;
    }

}

module.exports = Item;