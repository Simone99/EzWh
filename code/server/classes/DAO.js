const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const UserDAO = require('./DAOs/UserDAO');
const InternalOrderDAO = require('./DAOs/InternalOrderDAO');
const ItemDAO = require('./DAOs/ItemDAO');
const PositionDAO = require('./DAOs/PositionDAO');
const RestockOrderDAO = require('./DAOs/RestockOrderDAO');
const ReturnOrderDAO = require('./DAOs/ReturnOrderDAO');
const SKUDAO = require('./DAOs/SKUDAO');
const SKUItemDAO = require('./DAOs/SKUItemDAO');
const TestDescriptorDAO = require('./DAOs/TestDescriptorDAO');
const TestResultDAO = require('./DAOs/TestResultDAO');
class DAO {

    sqlite = require('sqlite3');

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, err => {
            if (err) throw err;
        });
        this.UserDAO = new UserDAO(this.db);
        this.InternalOrderDAO = new InternalOrderDAO(this.db);
        this.ItemDAO = new ItemDAO(this.db);
        this.PositionDAO = new PositionDAO(this.db);
        this.RestockOrderDAO = new RestockOrderDAO(this.db);
        this.ReturnOrderDAO = new ReturnOrderDAO(this.db);
        this.SKUDAO = new SKUDAO(this.db);
        this.SKUItemDAO = new SKUItemDAO(this.db);
        this.TestDescriptorDAO = new TestDescriptorDAO(this.db);
        this.TestResultDAO = new TestResultDAO(this.db);
    }

    async getAllPositions() {
        return await this.PositionDAO.getAllPositions();
    }

    async getAllSKUs() {
        return await this.SKUDAO.getAllSKUs();
    }

    async getSKUByID(ID) {
        return await this.SKUDAO.getSKUByID(ID);
    }

    async insertSKU(sku) {
        await this.SKUDAO.insertSKU(sku);
    }

    async updateSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity) {
        const sku = await this.SKUDAO.getSKUByID(SKUID);
        if (sku === undefined) {
            return 404;
        }
        if (newAvailableQuantity !== undefined) {
            const pos = await this.PositionDAO.getPosition(sku.getPosition());
            if (pos !== undefined) {
                if (pos.getMaxWeight() >= newWeight * newAvailableQuantity && pos.getMaxVolume() >= newVolume * newAvailableQuantity) {
                    await this.PositionDAO.updatePosition(pos.getPositionID(), newVolume * newAvailableQuantity, newWeight * newAvailableQuantity);
                } else {
                    return 422;
                }
            }
        }
        await this.SKUDAO.updateSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity);
    }

    async updateSKUPosition(SKUID, newPositionID) {
        const sku = await this.SKUDAO.getSKUByID(SKUID);
        if (sku === undefined) {
            return 404;
        }
        const pos = await this.PositionDAO.getPosition(newPositionID);
        if(pos !== undefined){
            const tmp_weight = sku.getWeight() * sku.getAvailableQuantity();
            const tmp_volume = sku.getVolume() * sku.getAvailableQuantity();
            if (pos.getMaxWeight() >= tmp_weight && pos.getMaxVolume() >= tmp_volume) {
                await this.PositionDAO.updatePosition(newPositionID, tmp_volume, tmp_weight);
            } else {
                return 422;
            }
        }
        await this.SKUDAO.updateSKUPosition(SKUID, newPositionID);
    }

    async deleteSKU(SKUID) {
        await this.SKUDAO.deleteSKU(SKUID);
    }

    async getSKUItems() {
        return await this.SKUItemDAO.getSKUItems();
    }

    async getSKUItemsAvailable(SKUID, available) {
        return await this.SKUItemDAO.getSKUItemsAvailable(SKUID, available);
    }

    async getSKUItemByRFID(RFID) {
        return await this.SKUItemDAO.getSKUItemByRFID(RFID);
    }

    async addSKUItem(skuItem) {
        const sku = await this.SKUDAO.getSKUByID(skuItem.getSKUId());
        if (sku === undefined) {
            return 404;
        }
        return await this.SKUItemDAO.addSKUItem(skuItem);
    }

    async editSKUItem(newRFID, newAvailable, newDateOfStock, oldRFID) {
        const skuItem = await this.SKUItemDAO.getSKUItemByRFID(oldRFID);
        if (skuItem === 404) {
            return 404;
        }
        await this.SKUItemDAO.editSKUItem(newRFID, newAvailable, newDateOfStock, oldRFID);
    }

    async deleteSKUItem(RFID) {
        await this.SKUItemDAO.deleteSKUItem(RFID);
    }

    async getAllRestockOrders() {
        const restockOrderList = await this.RestockOrderDAO.getAllRestockOrders();
        if(restockOrderList.length > 0){
            for(let ro of restockOrderList){
                const currentState = ro.getState();
                if(currentState !== "ISSUED"){
                    const deliveryDate = await this.RestockOrderDAO.getTransportNoteByID(ro.getTransportNote());
                    ro.setTransportNote(deliveryDate);
                }else{
                    delete ro.transportNote;
                }
                if(currentState !== "DELIVERY" && currentState !== "ISSUED"){
                    const skuItems = await this.SKUItemDAO.getSKUItemByRestockOrder(ro.getID());
                    ro.addSKUItems(skuItems);
                }
                const products = await this.RestockOrderDAO.getRestockOrderProducts(ro.getID());
                ro.addProducts(products);
            }
        }
        return restockOrderList;
    }

    async getAllRestockOrdersIssued() {
        const restockOrderList = await this.RestockOrderDAO.getAllRestockOrdersIssued();
        if(restockOrderList.length > 0){
            for(let ro of restockOrderList){
                const products = await this.RestockOrderDAO.getRestockOrderProducts(ro.getID());
                ro.addProducts(products);
                delete ro.transportNote;
            }
        }
        return restockOrderList;
    }

    async getRestockOrderByID(ID) {
        const ro = await this.RestockOrderDAO.getRestockOrderByID(ID);
        if (ro == undefined) {
            return 404;
        }
        const currentState = ro.getState();
        if(currentState !== "ISSUED"){
            const deliveryDate = await this.RestockOrderDAO.getTransportNoteByID(ro.getTransportNote());
            ro.setTransportNote(deliveryDate);
        }else{
            delete ro.transportNote;
        }
        if(currentState !== "DELIVERY" && currentState !== "ISSUED"){
            const skuItems = await this.SKUItemDAO.getSKUItemByRestockOrder(ro.getID());
            ro.addSKUItems(skuItems);
        }
        const products = await this.RestockOrderDAO.getRestockOrderProducts(ro.getID());
        ro.addProducts(products);

        return ro;
    }

    async getSKUItemsWithNegTest(ResOrderID) {
        const restockOrder = await this.getRestockOrderByID(ResOrderID);
        if (restockOrder == undefined) {
            return 404;
        }
        if(restockOrder.getState() !== "COMPLETEDRETURN"){
            return 422;
        }
        const skuItemList = restockOrder.getAllSKUItems();
        const returnValue =  [];
        if(skuItemList.length > 0){
            for(let skuItem of skuItemList){
                const testResults = await this.TestResultDAO.getTestResultsByRFID(skuItem.rfid);
                if(testResults.every(tr => tr.getResult() == false)){
                    returnValue.push(skuItem);
                }
            }
        }
        return returnValue;
    }

    async addRestockOrder(issueDate, products, supplierId) {
        const ID = await this.RestockOrderDAO.addRestockOrder(issueDate, "ISSUED", supplierId);
        if(products.length > 0){
            for(let prod of products){
                const itemID = await this.ItemDAO.getItemIDByProperties(prod.description, prod.price, supplierId, prod.SKUId);
                if(itemID !== undefined){
                    const restockOrderItemID = await this.RestockOrderDAO.addRestockOrderItem(itemID, prod.qty);
                    if(restockOrderItemID !== undefined){
                        await this.RestockOrderDAO.addRestockOrderItemToList(ID, restockOrderItemID);
                    }
                }
            }
        }
    }

    async editRestockOrderState(ResOrderID, newState) {
        return await this.RestockOrderDAO.editRestockOrderState(ResOrderID, newState);
    }

    async editRestockOrderSkuItems(restockOrderID, SKUItemsList) {
        const restockOrder = await this.RestockOrderDAO.getRestockOrderByID(restockOrderID);
        if (restockOrder === undefined) {
            return 404;
        }
        if(restockOrder.getState() !== "DELIVERED"){
            return 422;
        }
        for(let skuItem of SKUItemsList){
            await this.RestockOrderDAO.editRestockOrderSkuItems(restockOrderID, skuItem.rfid);
        }
    }

    async editRestockOrderTransportNote(ResOrderID, tNote) {
        const restockOrder = await this.RestockOrderDAO.getRestockOrderByID(ResOrderID);
        if (restockOrder === undefined) {
            return 404;
        }
        if (restockOrder.getState() !== "DELIVERY" || restockOrder.getIssueDate() && dayjs(tNote.deliveryDate).isBefore(dayjs(restockOrder.getIssueDate()))) {
            return 422;
        }
        const transportNoteID = await this.RestockOrderDAO.addTransportNote(tNote.deliveryDate);
        return await this.RestockOrderDAO.editRestockOrderTransportNote(ResOrderID, transportNoteID);
    }

    async deleteRestockOrder(ResOrderID) {
        if (ResOrderID < 0) {
            return 422;
        }
        return await this.RestockOrderDAO.deleteRestockOrder(ResOrderID);
    }
    async getAllUsers() {
        return await this.UserDAO.getAllUsers();
    }

    async getUser(username, type){
        return await this.UserDAO.getUserByTypeAndUsername(type, username);
    }

    async addUser(user){
        const storedUser = await this.UserDAO.getUserByTypeAndUsername(user.getType(), user.getUsername());
        if (storedUser === undefined) {
            await this.UserDAO.insertUser(user);
            return 201;
        } else {
            return 409;
        }
    }

    async getAllSuppliers() {
        return await this.UserDAO.getAllSuppliers();
    }

    async editUser(username, oldType, newType) {
        const storedUser = await this.UserDAO.getUserByTypeAndUsername(oldType, username);
        if (storedUser === undefined) {
            return 404;
        }
        await this.UserDAO.editUser(username, oldType, newType);
    }

    async deleteUser(username, type) {
        await this.UserDAO.deleteUser(username, type);
    }

    async getTestResultsByRFID(RFID) {
        const skuItem = await this.SKUItemDAO.getSKUItemByRFID(RFID);
        if(skuItem === 404){
            return 404;
        }
        return await this.TestResultDAO.getTestResultsByRFID(RFID);
    }

    async getTestResultByRFIDAndID(RFID, ID) {
        return await this.TestResultDAO.getTestResultByRFIDAndID(RFID, ID);
    }

    async getReturnOrderList() {
        const roList = await this.ReturnOrderDAO.getReturnOrderList();
        if (roList !== undefined && roList.length !== 0) {
            for (let ro of roList) {
                const skuItemList = await this.SKUItemDAO.getSKUItemByReturnOrder(ro.getID());
                ro.addSKUItem(skuItemList);
            }
        }
        return roList;
    }

    async getReturnOrder(returnOrderID) {
        const returnOrder = await this.ReturnOrderDAO.getReturnOrder(returnOrderID);
        if (returnOrder !== undefined) {
            const skuItemList = await this.SKUItemDAO.getSKUItemByReturnOrder(returnOrder.getID());
            returnOrder.addSKUItem(skuItemList)
        }
        return returnOrder;
    }

    async addReturnOrder(r, SKUItems, state) {
        const idReturned = await this.ReturnOrderDAO.addReturnOrder(r, state);
        if (idReturned === undefined) {
            return 0;
        }
        const result = await this.ReturnOrderDAO.addSKUItemsList(idReturned, SKUItems);
        if (result !== 0) {
            SKUItems.forEach(skuItem => this.SKUItemDAO.editSKUItem(skuItem.getSKU_RFID(), false, skuItem.getDateOfStock(), skuItem.getSKU_RFID()));
        }
        return result;
    }

    async deleteReturnOrder(returnOrderID) {
        await this.ReturnOrderDAO.deleteReturnOrder(returnOrderID);
    }

    async addTestResult(rfid, idTestDescriptor, Date, Result) {
        const storedSKUitem = await this.SKUItemDAO.getSKUItemByRFID(rfid);
        if (storedSKUitem === 404) {
            return 404;
        }
        const TestDescriptorxRFID = await this.TestDescriptorDAO.checkSKUID(idTestDescriptor, storedSKUitem.getSKUId());
        if (TestDescriptorxRFID === 404) {
            return 404;
        }
        const testResultID = await this.TestResultDAO.addTestResult(rfid, idTestDescriptor, Date, Result);
        await this.TestResultDAO.addTestResultxSKUitem(rfid, testResultID);
    }

    async editTestResult(rfid, id, newIdTestDescriptor, newDate, newResult) {
        const storedTestResult = await this.TestResultDAO.getTestResultByRFIDAndID(rfid, id);
        if(storedTestResult === 404) {
            return 404;
        }
        const storedSKUitem = await this.SKUItemDAO.getSKUItemByRFID(rfid);
        if (storedSKUitem === 404) {
            return 404;
        }
        const TestDescriptorxRFID = await this.TestDescriptorDAO.checkSKUID(newIdTestDescriptor, storedSKUitem.getSKUId());
        if (TestDescriptorxRFID === 404) {
            return 404;
        }
        await this.TestResultDAO.editTestResult(id, newIdTestDescriptor, newDate, newResult);
    }

    async deleteTestResult(rfid, id) {  
        const storedTestResult = await this.TestResultDAO.getTestResultByRFIDAndID(rfid, id);
        if (storedTestResult === 404) {
            return 404;
        }
        const storedSKUitem = await this.SKUItemDAO.getSKUItemByRFID(rfid);
        if(storedSKUitem === 404) {
            return 404;
        }
        await this.TestResultDAO.deleteTestResult(id);
        await this.TestResultDAO.deleteTestResultxSKUitem(storedSKUitem.getSKUId(), id);
    }

    async getAllItems() {
        return await this.ItemDAO.getAllItems();
    }

    async getItemById(id) {
        return await this.ItemDAO.getItemById(id);
    }

    async addItem(item) {
        const storedItem = await this.ItemDAO.getItemBySupplierIdAndSKUId(item.getSupplierId(), item.getSKUId());
        if (storedItem !== undefined) {
            return 422;
        }
        const addedItem = await this.ItemDAO.addItem(item);
    }

    async editItem(id, newDescription, newPrice) {
        const storedItem = await this.ItemDAO.getItemById(id);
        if (storedItem === undefined) {
            return 404;
        }
        return await this.ItemDAO.editItem(id, newDescription, newPrice);
    }

    async deleteItem(id) {
        await this.ItemDAO.deleteItem(id);
    }

    
    async getInternalOrdersList() {
        return await this.InternalOrderDAO.getInternalOrdersList();
    }

    async getInternalOrdersIssuedList() {
        return await this.InternalOrderDAO.getInternalOrdersIssuedList();
    }

    async getInternalOrdersAcceptedList() {
        return await this.InternalOrderDAO.getInternalOrdersAcceptedList();
    }

    async getInternalOrder(internalOrderID) {
        return await this.InternalOrderDAO.getInternalOrder(internalOrderID);
    }

    async addInternalOrder(newInternlOrder) {
        await this.InternalOrderDAO.addInternalOrder(newInternlOrder);
    }

    async editInternalOrder(internalOrderID, newState, products) {
        await this.InternalOrderDAO.editInternalOrder(internalOrderID, newState, products);
    }

    async deleteInternalOrder(internalOrderID) {
        await this.InternalOrderDAO.deleteInternalOrder(internalOrderID);
    }

    async addPosition(positionID, aisle, row, col, weight, volume){
        await this.PositionDAO.addPosition(positionID, aisle, row, col, weight, volume);
    }

    async editPositionID(oldPositionID, position){
        return await this.PositionDAO.editPositionID(oldPositionID, position);
    }

    async editPositionIDOnly(oldPositionID, newPositionID){
        const positionToEdit = await this.PositionDAO.getPosition(oldPositionID);
        if(positionToEdit === undefined){
            return undefined;
        }
        positionToEdit.setPositionID(newPositionID);
        return await this.PositionDAO.editPositionID(oldPositionID, positionToEdit);
    }

    async deletePosition(positionID){
        await this.PositionDAO.deletePosition(positionID);
    }

    async getAllTestDescriptors(){
        return await this.TestDescriptorDAO.getAllTestDescriptors();
    }

    async getTestDescriporByID(testDescriptorID){
        return await this.TestDescriptorDAO.getTestDescriporByID(testDescriptorID);
    }

    async addTestDescriptor(name, description, SKUID){
        const sku = await this.SKUDAO.getSKUByID(SKUID);
        if(sku === undefined) return undefined;
        return await this.TestDescriptorDAO.addTestDescriptor(name, description, SKUID);
    }

    async editTestDescriptor(testDescriptorID, newName, newDescription, newSKUId){
        const sku = await this.SKUDAO.getSKUByID(newSKUId);
        if(sku === undefined) return 0;
        return await this.TestDescriptorDAO.editTestDescriptor(testDescriptorID, newName, newDescription, newSKUId);
    }

    async deleteTestDescriptor(testDescriptorID){
        await this.TestDescriptorDAO.deleteTestDescriptor(testDescriptorID);
    }
}

module.exports = DAO;