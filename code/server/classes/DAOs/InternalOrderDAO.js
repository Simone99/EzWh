const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const InternalOrder = require('../InternalOrder');
const InternalOrderItem = require('../InternalOrderItem');
const SKU = require('../SKU');

class InternalOrderDAO {

    constructor(db) {
        this.db = db;
    }

    getInternalOrdersList() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE";
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const internalOrders = rows.map(row => {
                    return new InternalOrder(row.ID, row.STATE, row.ISSUEDATE, row.CUSTOMER);
                });
                resolve(internalOrders);
            });
        });
    }

    getInternalOrdersIssuedList() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE WHERE STATE = ?";
            this.db.all(sql, ['ISSUED'], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const internalOrdersIssued = rows.map(row => {
                    return new InternalOrder(row.ID, row.STATE, row.ISSUEDATE, row.CUSTOMER);
                });
                resolve(internalOrdersIssued);
            });
        });
    }

    getInternalOrdersAcceptedList() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE WHERE STATE = ?";
            this.db.all(sql, ['ACCEPTED'], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const internalOrdersIssued = rows.map(row => {
                    return new InternalOrder(row.ID, row.STATE, row.ISSUEDATE, row.CUSTOMER);
                });
                resolve(internalOrdersIssued);
            });
        });
    }

    getInternalOrder(internalOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE WHERE ID = ?";
            this.db.get(sql, [internalOrderID], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (row === undefined) {
                    resolve(undefined);
                } else {
                    resolve(new InternalOrder(row.ID, row.STATE, row.ISSUEDATE, row.CUSTOMER));
                }

            });
        });
    }

    getInternalOrderItems(internalOrderID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT SKU_TABLE.ID, SKU_TABLE.DESCRIPTION, SKU_TABLE.PRICE, INTERNALORDERITEM_TABLE.QUANTITY "
                        +
                        "FROM INTERNALORDERITEMS_LIST, INTERNALORDERITEM_TABLE, SKU_TABLE "
                        +
                        "WHERE INTERNALORDERITEMS_LIST.ID_INTERNALORDERITEM = INTERNALORDERITEM_TABLE.ID "
                        +
                        "AND INTERNALORDERITEM_TABLE.SKUID = SKU_TABLE.ID "
                        +
                        "AND INTERNALORDERITEMS_LIST.ID_INTERNALORDER = ?";
            this.db.all(sql, [internalOrderID], (err, rows) => {
                if(err){
                    reject(500);
                    return;
                }
                const items = rows.map(row => {
                    return row;
                });
                resolve(items);
            });
        });
    }

    addInternalOrder(issueDate, customerId) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO INTERNALORDER_TABLE(ISSUEDATE, STATE, CUSTOMER) VALUES(?,?,?)";
            this.db.run(sql, [issueDate, 'ISSUED', customerId], function(err) {
                if(err){
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    addInternalOrderItem(internalOrderItem) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO INTERNALORDERITEM_TABLE(SKUID, QUANTITY) VALUES (?,?)";
            this.db.run(sql, [internalOrderItem.SKUObj.id, internalOrderItem.qty], function(err) {
                if(err){
                    reject(err);
                }
                resolve(this.lastID);
            });
        });
    }

    addInternalOrderItemxInternalOrder(itemID, OrderID) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO INTERNALORDERITEMS_LIST(ID_INTERNALORDER, ID_INTERNALORDERITEM) VALUES (?,?)";
            this.db.run(sql, [OrderID, itemID], function(err) {
                if(err){
                    reject(err);
                }
                resolve('OK');
            });
        });
    }

    editInternalOrder(internalOrderID, newState) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE INTERNALORDER_TABLE SET STATE = ? WHERE ID = ?";
            this.db.run(sql, [newState, internalOrderID], err => {
                if(err){
                    reject(err);
                }else{
                    console.log(this.changes);

                    resolve(this.changes);
                }
            });
        });
    }

    addRFIDToInternalOrderItems(products) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO RFIDINTERNALORDERITEMS_LIST(SKUID, RFID) VALUES (?, ?)";
            this.db.run(sql, [newState, internalOrderID], err => {
                if(err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }
            });
        });
    }

    deleteInternalOrder(internalOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM INTERNALORDER_TABLE WHERE ID = ?";
            this.db.run(sql,[internalOrderID], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('OK');
                }
            });
        });
    }

}

module.exports = InternalOrderDAO;