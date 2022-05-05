class RestockOrderItem {

    Item = require('./Item');

    constructor(item, quantity) {
        this.itemObj = item;
        this.quantity = quantity;
    }

    setItemObj(itemObj) {
        this.itemObj = itemObj;
        return;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
        return;
    }

    getItemObj() {
        return this.itemObj;
    }

}

module.exports = RestockOrderItem;