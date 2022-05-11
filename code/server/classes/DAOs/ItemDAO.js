const sqlite = require('sqlite3');
const Item = require('../Item');

class ItemDAO{

    constructor(db){
        this.db = db;
    }

    async addItem(item) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO ITEM_TABLE(ID, DESCRIPTION, PRICE, USERID, SKUID) VALUES(?,?,?,?,?)";
            console.log(item.getId());
            console.log(item.getDescription());
            console.log(item.getPrice());
            console.log(item.getSupplierId());
            console.log(item.getSKUId());
            this.db.run(sql, [item.getId(), item.getDescription(), item.getPrice(), item.getSupplierId(), item.getSKUId()], err => {
                if(err){
                    console.log('err');

                    reject(err);
                }else{
                    resolve(201);
                }
            });
        });
    }

    getItemById(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM ITEM_TABLE WHERE ID = ?";
            this.db.get(sql, [id], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(undefined);
                }else{
                    resolve(new Item(row.ID, row.DESCRIPTION, row.PRICE, row.USERID, row.SKUID));
                }
            });
        });
    }

    getAllItems(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM ITEM_TABLE";
            this.db.all(sql, [], (err, rows) => {
                if(err){
                    reject(500);
                    return;
                }
                const items = rows.map(row => {
                    return new Item(row.ID, row.DESCRIPTION, row.PRICE, row.USERID, row.SKUID);
                });
                resolve(items);
            });
        });
    }

    async addItemxSKU(item) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO ITEMSSKU_LIST(ID_SKU, ID_ITEM) VALUES(?,?)";
            this.db.run(sql, [item.getSKUId(), item.getId()], err => {
                if(err){
                    reject(err);
                }else{
                    resolve(201);
                }
            });
        });
    }
}

module.exports = ItemDAO;