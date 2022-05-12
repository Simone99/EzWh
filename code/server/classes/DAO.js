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
const Position = require('./Position');
const SKUItem = require('./SKUItem');
const InternalOrderItem = require('./InternalOrderItem');
class DAO{

    sqlite = require('sqlite3');
    
    constructor(dbname){
        this.db = new sqlite.Database(dbname, err =>{
            if(err) throw err;
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

    async getAllPositions(){
        return await this.PositionDAO.getAllPositions();
    }

    async getAllSKUs(){
        return await this.SKUDAO.getAllSKUs();
    }

    async getSKUByID(ID){
        return await this.SKUDAO.getSKUByID(ID);
    }

    async insertSKU(sku){
        await this.SKUDAO.insertSKU(sku);
    }

    async updateSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity){
        const sku = await this.SKUDAO.getSKUByID(SKUID);
        if(sku === undefined){
            return 404;
        }
        if(newAvailableQuantity !== undefined){
            const pos = await this.PositionDAO.getPosition(sku.getPosition());
            if(pos !== undefined){
                if(pos.getMaxWeight() >= newWeight * newAvailableQuantity && pos.getMaxVolume() >= newVolume * newAvailableQuantity){
                    await this.PositionDAO.updatePosition(pos.getPositionID(), newVolume * newAvailableQuantity, newWeight * newAvailableQuantity);
                }else{
                    return 422;
                }
            }
        }
        await this.SKUDAO.updateSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity);
    }

    async updateSKUPosition(SKUID, newPositionID){
        const sku = await this.SKUDAO.getSKUByID(SKUID);
        if(sku === undefined){
            return 404;
        }
        const pos = await this.PositionDAO.getPosition(newPositionID);
        if(pos !== undefined){
            console.log(pos);
            const tmp_weight = sku.getWeight() * sku.getAvailableQuantity();
            const tmp_volume = sku.getVolume() * sku.getAvailableQuantity();
            if(pos.getMaxWeight() >= tmp_weight && pos.getMaxVolume() >= tmp_volume){
                await this.PositionDAO.updatePosition(newPositionID, tmp_volume, tmp_weight);
            }else{
                return 422;
            }
        }
        await this.SKUDAO.updateSKUPosition(SKUID, newPositionID);
    }

    async deleteSKU(SKUID){
        await this.SKUDAO.deleteSKU(SKUID);
    }

    async getSKUItems(){
        return await this.SKUItemDAO.getSKUItems();
    }

    async getSKUItemsAvailable(SKUID, available){
        return await this.SKUItemDAO.getSKUItemsAvailable(SKUID, available);
    }

    async getSKUItemByRFID(RFID){
        return await this.SKUItemDAO.getSKUItemByRFID(RFID);
    }

    async addSKUItem(skuItem){
        const sku = await this.SKUDAO.getSKUByID(skuItem.getSKUId());
        if(sku === undefined){
            return 404;
        }
        return await this.SKUItemDAO.addSKUItem(skuItem);
    }

    async editSKUItem(newRFID, newAvailable, newDateOfStock, oldRFID){
        const skuItem = await this.SKUItemDAO.getSKUItemByRFID(oldRFID);
        if(skuItem === 404){
            return 404;
        }
        await this.SKUItemDAO.editSKUItem(newRFID, newAvailable, newDateOfStock, oldRFID);
    }

    async deleteSKUItem(RFID){
        await this.SKUItemDAO.deleteSKUItem(RFID);
    }

    async getAllRestockOrders(){
        return await RestockOrderDAO.getAllRestockOrders();
    }

    async getAllRestockOrdersIssued(){
        return await RestockOrderDAO.getAllRestockOrdersIssued();
    }

    async getRestockOrderByID(ID){
        const RestockOrder = await this.RestockOrderDAO.getRestockOrderByID(ID);
        if(RestockOrder == undefined){
            return 404;
        }
        if(ID < 0){
            return 422;
        }
        return await RestockOrderDAO.getAllRestockOrdersIssued(ID);
    }

    async getSKUItemsWithNegTest(ResOrderID){
        const RestockOrder = await this.RestockOrderDAO.getRestockOrderByID(ID);
        if(RestockOrder == undefined){
            return 404;
        }
        if(ID < 0 || RestockOrder.getState() != "COMPLETEDRETURN"){
            return 422;
        }
        return await RestockOrderDAO.getSKUItemsWithNegTest(ResOrderID);
    }

    async addIssuedRestockOrder(restockOrder){
        return await RestockOrderDAO.addIssuedRestockOrder(restockOrder);
    }
    
    async editState(ResOrderID, newState){
        const RestockOrder = await this.RestockOrderDAO.getRestockOrderByID(ID);
        if(RestockOrder == undefined){
            return 404;
        }
        return await RestockOrderDAO.editState(ResOrderID, newState);
    }
    
    async addSKUItemsList(ResOrderID, SKUItemsList){
        const RestockOrder = await this.RestockOrderDAO.getRestockOrderByID(ResOrderID);
        if(RestockOrder == undefined){
            return 404;
        }
        return await RestockOrderDAO.addSKUItemsList(ResOrderID, SKUItemsList);
    }

    async setTransportNote(ResOrderID, TN){
        const RestockOrder = await this.RestockOrderDAO.getRestockOrderByID(ResOrderID);
        if(RestockOrder == undefined){
            return 404;
        }
        if(ResOrderID < 0 || RestockOrder.getState() != "DELIVERY"
            || RestockOrder.getDeliveryDate().isBefore(RestockOrder.getIssueDate())){
                return 422;
        }
        return await RestockOrderDAO.setTransportNote(ResOrderID, TN);
    }

    async deleteRestockOrder(ResOrderID){
        if(ResOrderID < 0){
            return 422;
        }
        return await RestockOrderDAO.deleteRestockOrder(ResOrderID);
    }
    async getAllUsers() {
        return await this.UserDAO.getAllUsers();
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

    async editUser(username, oldType, newType){
        const storedUser = await this.UserDAO.getUserByTypeAndUsername(oldType, username);
        if(storedUser === undefined){
            return 404;
        }
        await this.UserDAO.editUser(username, oldType, newType);
    }

    async deleteUser(username, type) {
        await this.UserDAO.deleteUser(username, type);
    }

    async getTestResultsByRFID(RFID) {
        return await this.TestResultDAO.getTestResultsByRFID(RFID);
    }

    async getTestResultByRFIDAndID(RFID, ID) {
        return await this.TestResultDAO.getTestResultByRFIDAndID(RFID, ID);
    }

    async getReturnOrderList(){
        const roList = await this.ReturnOrderDAO.getReturnOrderList();
        if(roList !== undefined && roList.length !== 0){
            for(let ro of roList){
                const skuItemList = await this.SKUItemDAO.getSKUItemByReturnOrder(ro.getID());
                ro.addSKUItem(skuItemList);
            }
        }
        return roList;
    }

    async getReturnOrder(returnOrderID){
        const returnOrder = await this.ReturnOrderDAO.getReturnOrder(returnOrderID);
        if(returnOrder !== undefined){
            const skuItemList = await this.SKUItemDAO.getSKUItemByReturnOrder(returnOrder.getID());
            returnOrder.addSKUItem(skuItemList)
        }
        return returnOrder;
    }

    async addReturnOrder(r, SKUItems, state){
        const idReturned = await this.ReturnOrderDAO.addReturnOrder(r, state);
        if(idReturned === undefined){
            return 0;
        }
        const result = await this.ReturnOrderDAO.addSKUItemsList(idReturned, SKUItems);
        if(result !== 0){
            SKUItems.forEach(skuItem => this.SKUItemDAO.editSKUItem(skuItem.getSKU_RFID(), false, skuItem.getDateOfStock(), skuItem.getSKU_RFID()));
        }
        return result;
    }

    async deleteReturnOrder(returnOrderID){
        await this.ReturnOrderDAO.deleteReturnOrder(returnOrderID);
    }

    async addTestResult(rfid, idTestDescriptor, Date, Result) {
        const storedSKUitem = await this.SKUItemDAO.getSKUItemByRFID(rfid);
        const TestDescriptorxRFID = await this.TestDescriptorDAO.checkSKUID(idTestDescriptor, storedSKUitem.getSKUId());
        if(TestDescriptorxRFID === 404) {
            return 404;
        }
        await this.TestResultDAO.addTestResult(rfid, idTestDescriptor, Date, Result);
        await this.TestResultDAO.addTestResultxSKUitem(rfid, idTestDescriptor);
    }

    async getAllItems() {
        return await this.ItemDAO.getAllItems();
    }

    async getItemById(id) {
        return await this.ItemDAO.getItemById(id);
    }

    async addItem(item) {
        //TODO
        //const storedItem = await this.ItemDAO.getItemById(item.getId());
        //if((storedItem.getSKUId() === item.getSKUId() || storedItem.getId() === item.getId()) && storedItem.getSupplierId() === item.getSupplierId()){
        //    return 422;
        //}
        const addedItem = await this.ItemDAO.addItem(item);
    }

    async editItem(id, newDescription, newPrice) {
        const storedItem = await this.ItemDAO.getItemById(id);
        if(storedItem === undefined) {          
            return 404;
        }
        return await this.ItemDAO.editItem(id, newDescription, newPrice);
    }

}

module.exports = DAO;