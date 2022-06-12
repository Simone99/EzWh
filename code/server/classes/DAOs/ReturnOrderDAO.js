const sqlite = require('sqlite3');
const ReturnOrder = require('../ReturnOrder');

class ReturnOrderDAO{

    constructor(db){
        this.db = db;
    }

    getReturnOrderList(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RETURNORDER_TABLE";
            this.db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    const roList = rows.map(row => new ReturnOrder(row.ID, row.RESTOCKORDER, null, row.RETURNDATE));
                    resolve(roList);
                }
            });
        });
    }
    
    getReturnOrderProducts(id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT SKU_TABLE.ID, SKU_TABLE.DESCRIPTION, SKU_TABLE.PRICE, SKUITEM_TABLE.RFID, SKUITEMSRETURNORDER_LIST.ITEM_ID "
                        +
                        "FROM SKU_TABLE, SKUITEMSRETURNORDER_LIST, RETURNORDER_TABLE, SKUITEM_TABLE "
                        +
                        "WHERE RETURNORDER_TABLE.ID = SKUITEMSRETURNORDER_LIST.ID_RETURNORDER "
                        +
                        "AND SKUITEM_TABLE.SKUID = SKU_TABLE.ID "
                        +
                        "AND SKUITEMSRETURNORDER_LIST.ID_SKUITEM = SKUITEM_TABLE.RFID "
                        +
                        "AND RETURNORDER_TABLE.ID = ?";
            this.db.all(sql, [id], (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    const items = rows.map(row => {
                        return {SKUId : row.ID, itemId : row.ITEM_ID, description : row.DESCRIPTION, price : row.PRICE, RFID : row.RFID};
                    });
                    resolve(items);
                }
            });
        });
    }

    getReturnOrder(returnOrderID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RETURNORDER_TABLE WHERE ID = ?";
            this.db.get(sql, [returnOrderID], (err, row) => {
                if(err){
                    reject(err);
                } else {
                    if(row === undefined){
                        resolve(row);
                    } else {
                        resolve(new ReturnOrder(row.ID, row.RESTOCKORDER, null, row.RETURNDATE));
                    }
                }
            });
        });
    }

    addProductxReturnOrder(insertedID, RFID, itemID) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO SKUITEMSRETURNORDER_LIST(ID_RETURNORDER, ID_SKUITEM, ITEM_ID) VALUES (?,?,?)";
            this.db.run(sql, [insertedID, RFID, itemID], function(err) {
                if(err){
                    reject(err);
                }else{
                    resolve('ok');
                }
            });   
        });
    }

    addReturnOrder(r, date){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO RETURNORDER_TABLE(RESTOCKORDER, RETURNDATE) VALUES(?,?)";
            this.db.run(sql, [r, date], function(err) {
                if(err){
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    deleteReturnOrder(returnOrderID){
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM RETURNORDER_TABLE WHERE ID = ?";
            this.db.run(sql, [returnOrderID], function(err){
                if(err){
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
    
}

module.exports = ReturnOrderDAO;