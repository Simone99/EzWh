class ReturnOrder{

    dayjs = require('dayjs');
    SKUItem = require('./SKUItem');

    constructor(id, r, SKUItems, state){
        SKUItems.forEach(skuItem => {
            skuItem.setAvailable(false);
        });
        this.id = id;
        this.restockOrder = r;
        this.SKUItemList = SKUItems;
        this.state = state;
        this.returnDate = dayjs();
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

}

module.exports = ReturnOrder;