class InternalOrder {

    constructor(id, state, issueDate, customerID) {
        this.id = id;
        this.issueDate = issueDate;
        this.state = state;
        this.customerID = customerID;
        this.products = [];
    }

    getID() {
        return this.id;
    }

    getCustomerID() {
        return this.customerID;
    }

    getIssueDate() {
        return this.issueDate;
    }

    getState() {
        return this.state;
    }

    setProductsList(products) {
        products.forEach(product => this.products.push(product));
    }

}

module.exports = InternalOrder;