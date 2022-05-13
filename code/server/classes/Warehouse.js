class Warehouse{
    
    Inventory = require('./Inventory');
    DAO = require('./DAO');
    Position = require('./Position');
    Customer = require('./Customer');
    User = require('./User');
    TestDescriptor = require('./TestDescriptor');
    RestockOrder = require('./RestockOrder');
    ReturnOrder = require('./ReturnOrder');
    InternalOrder = require('./InternalOrder');
    Item = require('./Item');
    SKU = require('./SKU');
    DAO = require('./DAO');
    
    constructor(){
        this.inventory = new this.Inventory('./EZWarehouseDB.db');
        this.DAO = new this.DAO('./EZWarehouseDB.db');
    }

    getInventory(){
        return this.inventory;
    }

    async getReturnOrderList(){
        return this.DAO.getReturnOrderList();
    }

    //TODO: rename parameter
    async getReturnOrder(returnOrderID){
        //TODO: add getReturnOrder
        return await this.DAO.getReturnOrder(returnOrderID);
    }

    async addReturnOrder(r, SKUItems, state){
        return await this.DAO.addReturnOrder(r, SKUItems, state);
    }

    //TODO: rename parameter
    async deleteReturnOrder(returnOrderID){
        await this.DAO.deleteReturnOrder(returnOrderID);
    }

    async getUserList() {
        return await this.DAO.getAllUsers();
    }

    async getSupplierList() {
        return await this.DAO.getAllSuppliers();
    }
    
    async addUser(user) {
    
        return await this.DAO.addUser(user);
    }

    async editUser(username, oldType, newType) {
        return await this.DAO.editUser(username, oldType, newType);
    }

    async deleteUser(username, type) {
        return await this.DAO.deleteUser(username, type);
    }

    async getTestResultsByRFID(RFID) {
        return await this.DAO.getTestResultsByRFID(RFID);
    }

    async getTestResultByRFIDAndID(RFID, ID) {
        return await this.DAO.getTestResultByRFIDAndID(RFID, ID);
    }

    async addTestResult(rfid, idTestDescriptor, Date, Result) {
        await this.DAO.addTestResult(rfid, idTestDescriptor, Date, Result);
    }

    async editTestResult(rfid, id, newIdTestDescriptor, newDate, newResult) {
        await this.DAO.editTestResult(rfid, id, newIdTestDescriptor, newDate, newResult);
    }

    async deleteTestResult(rfid, id) {
        await this.DAO.deleteTestResult(rfid, id);
    }

    async getItemList() {
        return await this.DAO.getAllItems();
    }

    async getItemById(id) {
        return await this.DAO.getItemById(id);
    }

    async addItem(item) {
        return await this.DAO.addItem(item);
    }

    async editItem(id, newDescription, newPrice) {
        return await this.DAO.editItem(id, newDescription, newPrice);
    }

    async deleteItem(id) {
        await this.DAO.deleteItem(id);
    }
}

module.exports = Warehouse;