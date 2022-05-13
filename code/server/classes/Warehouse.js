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

        //TODO: retrieve all lists from DAO
        this.positionList = [];
        this.customerList = [];
        this.userList = [];
        this.testDescriptorList = [];
        this.restockOrderList = [];
        this.internalOrderList = [];
        this.supplierList = [];
        this.returnOrderList = [];
        this.DAO = new this.DAO('./EZWarehouseDB.db');
    }

    getInventory(){
        return this.inventory;
    }

    async addPosition(positionID, aisle, row, col, weight, volume){
        await this.DAO.addPosition(positionID, aisle, row, col, weight, volume);
    }

    async deletePosition(positionID){
        await this.DAO.deletePosition(positionID);
    }

    //TODO: modify parameters in the design document
    async editPositionID(oldPositionID, position){
        return await this.DAO.editPositionID(oldPositionID, position);
    }

    async editPositionIDOnly(oldPositionID, newPositionID){
        return await this.DAO.editPositionIDOnly(oldPositionID, newPositionID);
    }

    searchPosition(positionID){
        return this.positionList.filter(pos => pos.getPositionID() === positionID)[0];
    }

    //TODO: check for filters, they are not needed concerning the APIs
    async printPositionList(){
        return await this.DAO.getAllPositions();
    }

    addCustomer(customerID, name, surname){
        //TODO: edit the design document in order to add the ID or think of an incremental number by DB, so no customerID needed
        const tmp = new this.Customer(customerID, name, surname);
        this.customerList.push(tmp);
        //TODO: use DAO to insert it into DB
    }

    addUser(userID, name, surname, type, username, password){
        const tmp = new this.User(username, name, surname, password, type);
        this.userList.push(tmp);
        //TODO: use DAO to insert it into DB
    }

    //TODO: insert into the design document the new parameter
    editUser(email, newType){
        this.userList = this.userList.map(u => {
            //TODO: rename username into email and add getEmail method to user class
            if(u.getEmail() === email){
                u.setType(newType);
                //TODO: use DAO to update db
            }
            return u;
        })
    }

    deleteUser(email, type){
        //TODO: add getType into User class
        this.userList = this.userList.filter(u => u.getEmail() !== email && u.getType() !== type);
        //TODO: use DAO to update DB
    }

    searchUser(userID){
        return this.userList.filter(u => u.getID() === userID)[0];
    }

    printUserList(filter){
        return this.userList.filter(u => u.getType() === filter);
    }

    //This function is equal to edit user and we should add a parameter or delete it
    modifyUserRights(email, newType){
        this.userList = this.userList.map(u => {
            //TODO: rename username into email and add getEmail method to user class
            if(u.getEmail() === email){
                u.setType(newType);
                //TODO: use DAO to update db
            }
            return u;
        })
    }

    async addTestDescriptor(name, description, SKUID){
        return await this.DAO.addTestDescriptor(name, description, SKUID);
    }

    //TODO: insert alla the parameters inside the class diagram
    async editTestDescriptor(testDescriptorID, newName, newDescription, newSKUId){
        return await this.DAO.editTestDescriptor(testDescriptorID, newName, newDescription, newSKUId);
    }

    async deleteTestDescriptor(testDescriptorID){
        await this.DAO.deleteTestDescriptor(testDescriptorID);
    }

    async searchTestDescriptor(testDescriptorID){
        return await this.DAO.getTestDescriporByID(testDescriptorID);
    }

    async printTestDescriptorList(){
        return this.DAO.getAllTestDescriptors();
    }

    //TODO: add parameters inside class diagram
    addRestockOrder(supplierID, issueDate, products){
        //TODO: add parameters inside the constructor
        const ro = new this.RestockOrder(supplierID, issueDate, products);
        this.restockOrderList.push(ro);
        //TODO: use DAO to insert it into db
    }

    getRestockOrder(restockOrderID){
        //TODO: Add getRestockOrderID inside RestockOrder class
        return this.restockOrderList.filter(ro => ro.getRestockOrderID() === restockOrderID)[0];
    }

    getRestockOrderList(){
        return this.restockOrderList;
    }

    //TODO: add parameter inside class diagram
    editRestockOrder(restockOrderID, newState){
        this.restockOrderList.map(ro => {
            if(ro.getRestockOrderID() === restockOrderID){
                ro.changeState(newState);
                //TODO: update DB using DAO
            }
            return ro;
        })
    }

    deleteRestockOrder(restockOrderID){
        this.restockOrderList = this.restockOrderList.filter(ro => ro.getRestockOrderID() !== restockOrderID);
        //TODO: use DAO to delete it
    }

    //TODO: update parameter name inside class diagram
    printRestockOrders(filterState){
        //TODO: add getState to RestockOrder class
        return this.restockOrderList.filter(ro => ro.getState() === filterState);
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

    async addInternalOrder(newInternlOrder){
        await this.DAO.addInternalOrder(newInternlOrder);
    }

    async getInternalOrdersList(){
        return this.DAO.getInternalOrdersList();
    }

    async getInternalOrdersIssuedList(){
        return this.DAO.getInternalOrdersIssuedList();
    }

    async getInternalOrdersAcceptedList() {
        return this.DAO.getInternalOrdersAcceptedList();
    }


    async getInternalOrder(internalOrderID){
        return this.DAO.getInternalOrder(internalOrderID);
    }

    async deleteInternalOrder(internalOrderID){
        this.internalOrderList = this.internalOrderList.filter(io => io.getInternalOrderID !== internalOrderID);
        
        await this.DAO.deleteInternalOrder(internalOrderID);
    }

    async editInternalOrder(internalOrderID, newState, products){
        this.internalOrderList = this.internalOrderList.map(io => {
            if(io.getInternalOrderID() === internalOrderID){
                io.changeState(newState);
                if(products !== undefined)
                    io.addSKUItem(products);
            }
        });
        await this.DAO.editInternalOrder(internalOrderID, newState, products);
    }

    getItem(itemID){
        const skuList = this.inventory.getSKUList();
        for(let sku of skuList){
            const itemList = sku.getItemsList();
            //TODO: add getItemID in Item class
            const filteredItemList = itemList.filter(item => item.getItemID() === itemID);
            if(filteredItemList.length !== 0)
                return filteredItemList[0];
        }
        return null;
    }

    //TODO: add parameters
    editItem(itemID, newDescription, newPrice){
        const itemToEdit = getItem(itemID);
        if(itemToEdit !== null){
            itemToEdit.setDescription(newDescription);
            itemToEdit.setPrice(newPrice);
            //TODO: update database using DAO
        }
    }

    deleteItem(itemID){
        const skuList = this.inventory.getSKUList();
        for(let sku of skuList){
            //TODO: add setItemsList
            const filteredItemList = sku.getItemsList().filter(item => item.getItemID() !== itemID);
            sku.setItemsList(filteredItemList);
            //TODO: delete it from database using DAO
        }
    }

    printItemList(){
        const listToReturn = [];
        const skuList = this.inventory.getSKUList();
        for(let sku of skuList){
            //TODO: add setItemsList
            listToReturn.push(...sku.getItemsList());
        }
        return listToReturn;
    }

    async getUserList() {
        return await this.DAO.getAllUsers();
    }

    async getUser(username, type){
        return await this.DAO.getUser(username, type);
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
}

module.exports = Warehouse;