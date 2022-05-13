const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const InternalOrder = require('../InternalOrder');

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
                    return new InternalOrder(row.ID, row.STATE, row.ITN, row.CUSTOMER);
                });
                resolve(internalOrders);
            });
        });
    }

    getInternalOrdersIssuedList() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE WHERE STATE = 'ISSUED'";
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const internalOrdersIssued = rows.map(row => {
                    return new InternalOrder(row.ID, row.STATE, row.ITN, row.CUSTOMER);
                });
                resolve(internalOrdersIssued);
            });
        });
    }

    getInternalOrdersAcceptedList() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE WHERE STATE = 'ACCEPTED'";
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const internalOrdersIssued = rows.map(row => {
                    return new InternalOrder(row.ID, row.STATE, row.ITN, row.CUSTOMER);
                });
                resolve(internalOrdersIssued);
            });
        });
    }

    getInternalOrder(internalOrderID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM INTERNALORDER_TABLE WHERE ID = ?";
            this.db.all(sql, [internalOrderID], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (row === undefined) {
                    resolve(undefined);
                } else {
                    resolve(new InternalOrder(row.ID, row.STATE, row.ITN, row.CUSTOMER));
                }

            });
        });
    }

    addInternalOrder(newInternlOrder) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO INTERNALORDER_TABLE(ID, ISSUEDATE, STATE, ITN, CUSTOMER) VALUES(?,?,?,?,?)";
            this.db.run(sql, [newInternlOrder.getID(), dayjs(), newInternlOrder.getState(), newInternlOrder.getInternalTransportNote(), newInternlOrder.getCustomerID()], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve('OK');
                }
            });
        });
    }

    editInternalOrder(internalOrderID, newState, products) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE INTERNALORDER_TABLE SET STATE = ? WHERE ID = ?";
            this.db.run(sql, [newState, internalOrderID], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('OK');
                }
            });

            /*if(newState == "COMPLETED") {
                const sql1 = 
            }*/
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