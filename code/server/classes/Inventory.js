class Inventory{

    SKU = require('./SKU');
    SKUItem = require('./SKUItem');
    DAO = require('./DAO');

    constructor(dbname){
        this.DAO = new this.DAO(dbname);
    }

    async getSKUList(){
        return await this.DAO.getAllSKUs();
    }

    async addSKU(item){
        console.log(item);
        await this.DAO.insertSKU(item);
    }

    //TODO: rename function parameter
    async deleteSKU(SKUID){
        //TODO: add getSKUID method to SKU class
        await this.DAO.deleteSKU(SKUID);
        //TODO: delete it from db using DAO
    }

    //TODO: rename function parameter
    async searchSKU(SKUIDorDescription){
        //TODO: add getDescription method to SKU class
        return await this.DAO.getSKUByID(SKUIDorDescription);
        //return this.SKUList.filter(sku => (typeof SKUIDorDescription === 'number')? sku.getSKUID() : sku.getDescription() === SKUIDorDescription)[0];
    }

    //TODO: rename parameter and add parameters
    async editSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity){
        return await this.DAO.updateSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity);
    }

    //TODO: add the following method inside SKU class
    async editSKUPosition(SKUID, position){
        return await this.DAO.updateSKUPosition(SKUID, position);
    }

    searchSKUItem(RFID){
        for(let sku in this.SKUList){
            const tmp = sku.getSKUItemsList().filter(skuitem => skuitem.getSKU_RFID());
            if(tmp.length != 0)
                return tmp[0];
        }
        return null;
    }
}

module.exports = Inventory;