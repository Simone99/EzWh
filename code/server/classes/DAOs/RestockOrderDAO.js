const sqlite = require('sqlite3');
const restockOrder = require('../RestockOrder');
const SKUItem = require('../SKUItem');

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
                    return;
                }
                const restockOrders = rows.map(row => {
                    return new restockOrder(row.ID, row.STATE, row.USERID, row.TRANSPORTNOTE);
                });
                resolve(restockOrders);
            });
        });
    }

    getAllRestockOrdersIssued() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RESTOCKORDER_TABLE WHERE STATE = 'ISSUED'";
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const ResOrdersIssued = rows.map(row => {
                    return new restockOrder(row.ID, row.STATE, row.USERID, row.TRANSPORTNOTE);
                });
                resolve(ResOrdersIssued);
            });
        });
    }

    getRestockOrderByID(ID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM RESTOCKORDER_TABLE WHERE ID = ?";
            this.db.get(sql, [ID], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (row == undefined) {
                    resolve(undefined);
                } else {
                    resolve(new restockOrder(row.ID, row.STATE, row.USERID, row.TRANSPORTNOTE));
                }
            });
        });
    }

    getSKUItemsWithNegTest(ResOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT *" +
                "FROM " +
                "RESTOCKORDER_TABLE INNER JOIN SKUITEMSRESTOCKORDER_LIST ON SKUITEMSRESTOCKORDER_LIST.ID_RESTOCKORDER = RESTOCKORDER_TABLE.ID," +
                "SKUITEM_TABLE INNER JOIN SKUITEMSRESTOCKORDER_LIST ON SKUITEMSRESTOCKORDER_LIST.ID_SKUITEM = SKUITEM_TABLE.RFID," +
                "TESTRESULTSKUITEM_LIST INNER JOIN TESTRESULT_TABLE ON TESTRESULT_TABLE.ID = TESTRESULTSKUITEM_LIST.ID_TESTRESULT," +
                "TESTRESULTSKUITEM_LIST INNER JOIN SKUITEM_TABLE ON TESTRESULTSKUITEM_LIST.ID_SKUITEM = SKUITEM_TABLE.RFID " +
                "WHERE RESULT = 0 AND RESTOCKORDER_TABLE.ID = ?"
            this.db.all(sql, [ResOrderID], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const SKUItemsWithNegTest = rows.map(row => new SKUItem(row.SKUID, row.AVAILABLE, row.DATEOFSTOCK, row.RFID));
                resolve(SKUItemsWithNegTest);
            });
        });
    }

    addRestockOrder(restockOrder) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO RESTOCKORDER_TABLE(ID, ISSUEDATE, STATE, USERID, TRANSPORTNOTE) VALUES(?,?,?,?,?)";
            this.db.run(sql, [restockOrder.ID, restockOrder.ISSUEDATE, restockOrder.STATE, restockOrder.USERID, restockOrder.TRANSPORTNOTE], err => {
                if (err) {
                    reject(err);
                    return;
                }
                //With an empy list of SKU Items means no rows inside SKUITEMSRESTOCKORDER_LIST 
                resolve('OK');
            });
        });
    }

    editState(ResOrderID, newState) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE RESTOCKORDER_TABLE SET STATE = ? WHERE ID = ?";
            this.db.run(sql, [newState, ResOrderID], err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('OK');
            });
        });
    }

    addSKUItemsList(ResOrderID, SKUItemsList) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO SKUITEMSRESTOCKORDER_LIST(ID_SKUITEM, ID_RESTOCKORDER) VALUES (?,?)";
            SKUItemsList.forEach(element => {
                this.db.run(sql, [element.ID, ResOrderID], err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                })
            });
            resolve('OK');
        });
    }

    setTransportNote(ResOrderID, tNote) {
        console.log('!!!!');
        return new Promise((resolve, reject) => {
            const sql = "UPDATE RESTOCKORDER_TABLE SET TRANSPORTNOTE = ? WHERE ID = ?";
            this.db.run(sql, [tNote, ResOrderID], err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('OK');
            });
        });
    }

    deleteRestockOrder(ResOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM RESTOCKORDER_TABLE WHERE ID = ?";
            this.db.run(sql, [ResOrderID], err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('OK');
            });
        });
    }


}

module.exports = RestockOrderDAO;