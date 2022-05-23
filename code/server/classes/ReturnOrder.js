class ReturnOrder{

    constructor(id, r, state, returnDate = null){
        this.id = id;
        this.restockOrderId = r;
        this.state = state;
        this.returnDate = returnDate;
        this.products = [];
    }

    getID(){
        return this.id;
    }

    addSKUItem(products) {
        products.forEach(product => this.products.push(product));
    }
}

module.exports = ReturnOrder;