class ReturnOrder{

    dayjs = require('dayjs');
    SKUItem = require('./SKUItem');

    constructor(id, r, state, returnDate = null){
        this.id = id;
        this.restockOrder = r;
        this.state = state;
        this.returnDate = returnDate;
    }

    getID(){
        return this.id;
    }

}

module.exports = ReturnOrder;