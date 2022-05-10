const dayjs = require("dayjs");

class InternalOrder {

    Customer = require('./Customer');
    InternalTransportNote = require('./InternalTransportNote');
    SKU = require('./SKU');
    InternalOrderItem = require('./InternalOrderItem');
    //SKUItem = require('./SKUItem');

    constructor(state, customerID) {
        this.issueDate = dayjs();
        this.state = state;
        this.internalOrderItemsList = [];
        this.ITN = new this.InternalTransportNote(shipmentDate = dayjs());
        this.customerID = customerID;
        this.SKUItemsList = [];
    }

    addSKU(s, quantity) {
        const newIntOrdItem = new this.InternalOrderItem(s, quantity);
        this.internalOrderItemsList.push(newIntOrdItem);

        //Where is the quantity of SKU/Sku items of our inventory???

        return;
    }

    defineQuantity(id, quantity) {
        this.internalOrderItemsList.filter((intOrdItem) => (intOrdItem.id == id)).setQuantity(quantity);
        return;
    }

    issue() {
        this.state = "issued";
        this.issueDate = dayjs();
        return;
    }

    //to delete a SKU from an order I think it is better to pass the RFID of a SKU, not a generic id
    deleteSKU(RFID) {
        
        let index = this.SKUItemsList.indexOf((SKUItem) => SKUItem.RFID = RFID);
        let SKUIdToDelete = this.SKUItemsList.indexOf(index).getSKUid();

        let index1 = this.internalOrderItemsList.indexOf((IntOrdItem) => IntOrdItem.getSKU().getSKUid() == SKUIdToDelete);

        let qtyIntOrdItem = this.internalOrderItemsList[index1].getQuantity();
        qtyIntOrdItem -= 1
        this.internalOrderItemsList[index1].setQuantity(qtyIntOrdItem);

        //Where is the quantity of SKU/Sku items of our inventory???

        this.internalOrderItemsList.splice(index1, 1);
        this.SKUItemsList.splice(index, 1);

        return;
    }

    changeState(state) {
        this.state = state;
        return;
    }

    getInternalTransportNote() {
        return this.ITN;
    }

    selectFirstCame() {
        //TODO:??
    }

    /*removeSKUFromWH() {
        //TODO: Maybe a SKU item, a SKU should not be deleted from wharehouse
    }*/

    setCustomerId(id) {
        this.customerID = id;
        return;
    }

    getSKUItems() {
        return this.SKUItemsList;
    }

    addSKUItem(newSKU) {
        this.SKUItemsList.push(newSKU);
        return;
    }

}

module.exports = InternalOrder;