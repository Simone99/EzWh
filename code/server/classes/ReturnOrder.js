class ReturnOrder{

    dayjs = require('dayjs');
    SKUItem = require('./SKUItem');

    constructor(id, r, SKUItems, state, returnDate = null){
        this.id = id;
        this.restockOrder = r;
        this.SKUItemList = [];
        this.state = state;
        this.returnDate = returnDate;
    }

    //Maybe this function is not needed
    issue(){
        this.changeState();
    }

    //Maybe this function is not needed since no state is mentioned in the official requirements and APIs
    changeState(state){
        this.state = state;
    }

    addSKUItem(s){
        s.forEach(skuItem =>{
            skuItem.setAvailable(false);
        });
        this.SKUItemList.push(s);
    }

    getID(){
        return this.id;
    }

}

module.exports = ReturnOrder;