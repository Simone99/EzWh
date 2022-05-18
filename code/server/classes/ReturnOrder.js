class ReturnOrder{

    dayjs = require('dayjs');
    SKUItem = require('./SKUItem');

    constructor(id, r, state, returnDate = null){
        this.id = id;
        this.restockOrder = r;
        this.state = state;
        this.returnDate = returnDate;
        this.SKUItemList = [];
    }

    getID(){
        return this.id;
    }

    addSKUItem(s){
        this.SKUItemList.push(s);
    }
}

module.exports = ReturnOrder;