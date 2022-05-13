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
                    return;
                }
                const roList = rows.map(row => new ReturnOrder(row.ID, row.RESTOCKORDER, null, row.STATE, row.RETURNDATE));
                resolve(roList);
            });
        });
    }

    getReturnOrder(returnOrderID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RETURNORDER_TABLE WHERE ID = ?";
            this.db.get(sql, [returnOrderID], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(row);
                    return;
                }
                resolve(new ReturnOrder(row.ID, row.RESTOCKORDER, null, row.STATE, row.RETURNDATE));
            });
        });
    }

    addSKUItemsList(insertedID, SKUItems) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO SKUITEMSRETURNORDER_LIST(ID_RETURNORDER, ID_SKUITEM) VALUES (?,?)";
            SKUItems.forEach(skuItem =>  {
                this.db.run(sql, [insertedID, skuItem.getSKU_RFID()], function(err) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(this.changes);
                    }
                });
            });    
        });
    }

    addReturnOrder(r, state){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO RETURNORDER_TABLE(RESTOCKORDER, STATE) VALUES(?,?)";
            this.db.run(sql, [r, state], function(err) {
                if(err){
                    reject(err);
                    return;
                }
                resolve(this.lastId);
            });
        });
    }

    deleteReturnOrder(returnOrderID){
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM RETURNORDER_TABLE WHERE ID = ?";
            this.db.run(sql, [returnOrderID], function(err){
                if(err){
                    reject(err);
                    return;
                }
                resolve(this.changes);
            });
        });
    }
    
}

module.exports = ReturnOrderDAO;