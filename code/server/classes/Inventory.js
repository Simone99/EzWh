class Inventory{

    SKU = require('./SKU');
    SKUItem = require('./SKUItem');

    constructor(){
        //TODO: retrieve data from db using DAO
        this.SKUList = [];
    }

    getSKUList(){
        return this.SKUList;
    }

    addSKU(item){
        this.SKUList.push(item);
        //TODO: insert it into db using DAO
    }

    //TODO: rename function parameter
    deleteSKU(SKUID){
        //TODO: add detSKUID method to SKU class
        this.SKUList = this.SKUList.filter(sku => sku.getSKUID() !== SKUID);
        //TODO: delete it from db using DAO
    }

    //TODO: rename function parameter
    searchSKU(SKUIDorDescription){
        //TODO: add getDescription method to SKU class
        return this.SKUList.filter(sku => (typeof SKUIDorDescription === 'number')? sku.getSKUID() : sku.getDescription() === SKUIDorDescription)[0];
    }

    //TODO: rename parameter and add parameters
    editSKU(SKUID, newDescription, newWeight, newVolume, newNotes, newPrice, newAvailableQuantity){
        this.SKUList = this.SKUList.map(sku => {
            if(sku.getSKUID() === SKUID){
                sku.setDescritpion(newDescription);
                sku.setWeight(newWeight);
                sku.setVolume(newVolume);
                sku.setNotes(newNotes);
                sku.setPrice(newPrice);
                sku.setAvailableQuantity(newAvailableQuantity);
                //TODO: update changes inside the db
            }
            return sku;
        });
    }

    //TODO: add the following method inside SKU class
    editSKUPosition(SKUID, position){
        this.SKUList = this.SKUList.map(sku => {
            if(sku.getSKUID() === SKUID){
                sku.setPosition(position);
                //TODO: update changes inside the db
            }
            return sku;
        });
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