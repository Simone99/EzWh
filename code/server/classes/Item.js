class Item {

    SKU = require('./SKU');
    Supplier = require('./Supplier');

    constructor(description, price, supplierID, SKUId, id=null) {
        this.id = id;
        this.description = description;
        this.price  = price;
        this.supplierID = supplierID;
        this.SKUId = SKUId;
    }

    getId() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

    getPrice() {
        return this.price;
    }

    getSupplierId() {
        return this.supplierID;
    }

    getSKUId() {
        return this.SKUId;
    }
}

module.exports = Item;