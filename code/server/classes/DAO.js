const sqlite = require('sqlite3');
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

}

module.exports = DAO;