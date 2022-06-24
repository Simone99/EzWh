const sqlite = require('sqlite3');
const RestockOrder = require('../RestockOrder');
const SKUItem = require('../SKUItem');
const TransportNote = require('../TransportNote');

class RestockOrderDAO {

    constructor(db) {
        this.db = db;
    }

    getAllRestockOrders() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RESTOCKORDER_TABLE";
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const restockOrders = rows.map(row => new RestockOrder(row.ID, row.ISSUEDATE, row.STATE, row.USERID, row.TRANSPORTNOTE));
                    resolve(restockOrders);
                }
            });
        });
    }

    getAllRestockOrdersIssued() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RESTOCKORDER_TABLE WHERE STATE = 'ISSUED'";
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const ResOrdersIssued = rows.map(row => new RestockOrder(row.ID, row.ISSUEDATE, row.STATE, row.USERID, row.TRANSPORTNOTE));
                    resolve(ResOrdersIssued);
                }
            });
        });
    }

    getRestockOrderByID(ID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RESTOCKORDER_TABLE WHERE ID = ?";
            this.db.get(sql, [ID], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row === undefined) {
                        resolve(undefined);
                    } else {
                        resolve(new RestockOrder(row.ID, row.ISSUEDATE, row.STATE, row.USERID, row.TRANSPORTNOTE));
                    }
                }
            });
        });
    }

    addRestockOrder(issueDate, state, supplierId) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO RESTOCKORDER_TABLE(ISSUEDATE, STATE, USERID) VALUES(?,?,?)";
            this.db.run(sql, [issueDate, state, supplierId], function(err){
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    editRestockOrderState(ResOrderID, newState) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE RESTOCKORDER_TABLE SET STATE = ? WHERE ID = ?";
            this.db.run(sql, [newState, ResOrderID], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    editRestockOrderTransportNote(ResOrderID, transportNoteID) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE RESTOCKORDER_TABLE SET TRANSPORTNOTE = ? WHERE ID = ?";
            this.db.run(sql, [transportNoteID, ResOrderID], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve('OK');
                }
            });
        });
    }

    deleteRestockOrder(ResOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM RESTOCKORDER_TABLE WHERE ID = ?";
            this.db.run(sql, [ResOrderID], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve('OK');
                }
            });
        });
    }
    
    deleteRestockOrderItems(ResOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM RESTOCKORDERITEM_TABLE WHERE ID_RESTOCKORDER = ?";
            this.db.run(sql, [ResOrderID], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve('OK');
                }
            });
        });
    }

    getTransportNoteByID(ID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT SHIPMENTDATE FROM TRANSPORTNOTE_TABLE WHERE ID = ?";
            this.db.get(sql, [ID], (err, row) => {
                if(err){
                    reject(err);
                } else {
                    if(row === undefined){
                        resolve(undefined);
                    } else {
                        resolve(new TransportNote(row.SHIPMENTDATE));
                    }
                }
            });
        });
    }

    getRestockOrderProducts(ID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * " +
                        "FROM RESTOCKORDERITEM_TABLE " +
                        "WHERE ID_RESTOCKORDER = ?";
            this.db.all(sql, [ID], (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    if(rows === undefined){
                        resolve(undefined);
                    } else {
                        const productsList = rows.map(row => {
                            return { SKUId : row.SKU_ID, itemId : row.ITEM_ID, description : row.DESCRIPTION, price : row.PRICE, qty : row.QUANTITY };
                        });
                        resolve(productsList);
                    }
                }
            });
        });
    }

    getRestockOrderItems(ID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * " +
                        "FROM SKUITEMSRESTOCKORDER_LIST " +
                        "WHERE ID_RESTOCKORDER = ?";
            this.db.all(sql, [ID], (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    if(rows === undefined){
                        resolve(undefined);
                    } else {
                        const itemList = rows.map(row => {
                            return { SKUId : row.SKU_ID, itemId : row.ID_ITEM, rfid : row.ID_SKUITEM};
                        });
                        resolve(itemList);
                    }
                }
            });
        });
    }

    addRestockOrderItem(ID, prod){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO RESTOCKORDERITEM_TABLE(ID_RESTOCKORDER, ITEM_ID, SKU_ID, DESCRIPTION, PRICE, QUANTITY) VALUES(?,?,?,?,?,?)";
            this.db.run(sql, [ID, prod.itemId, prod.SKUId, prod.description, prod.price, prod.qty], function(err){
                if(err){
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    addTransportNote(deliveryDate){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO TRANSPORTNOTE_TABLE(SHIPMENTDATE) VALUES(?)";
            this.db.run(sql, [deliveryDate], function(err){
                if(err){
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    editRestockOrderSkuItems(restockOrderID, RFID, ItemID, SKUID){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO SKUITEMSRESTOCKORDER_LIST(ID_SKUITEM, ID_RESTOCKORDER, ID_ITEM, SKU_ID) VALUES(?,?,?,?)";
            this.db.run(sql, [RFID, restockOrderID, ItemID, SKUID], function(err){
                if(err){
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }
}

module.exports = RestockOrderDAO;