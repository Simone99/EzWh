const sqlite = require('sqlite3');
const User = require('../User');

class UserDAO{

    constructor(db){
        this.db = db;
        
    }

    getAllUsers(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM USER_TABLE WHERE TYPE <> ?";
            this.db.all(sql, ['Manager'], (err, rows) => {
                if(err){
                    reject(500);
                    return;
                }
                const users = rows.map(row => {
                    return new User(row.NAME, row.SURNAME, row.TYPE, row.USERNAME, row.PASSWORD, row.ID);
                });
                resolve(users);
            });
        });
    }

    getUserByTypeAndUsername(type, username) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM USER_TABLE WHERE TYPE = ? AND USERNAME = ?";
            this.db.get(sql, [type, username], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(undefined);
                }else{
                    resolve(new User(row.ID, row.NAME, row.SURNAME, row.TYPE, row.USERNAME, row.PASSWORD));
                }
            });
        });
    }

    insertUser(user) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO USER_TABLE(NAME, SURNAME, TYPE, USERNAME, PASSWORD) VALUES(?,?,?,?,?)";
            this.db.run(sql, [user.getName(), user.getSurname(), user.getType(), user.getUsername(), user.getPassword()], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('OK');
                }
            });
        });
    }

    getAllSuppliers(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM USER_TABLE WHERE TYPE = ?";
            this.db.all(sql, ['Supplier'], (err, rows) => {
                if(err){
                    reject(500);
                    return;
                }
                const suppliers = rows.map(row => {
                    return new User(row.NAME, row.SURNAME, row.TYPE, row.USERNAME, row.PASSWORD, row.ID);
                });
                resolve(suppliers);
            });
        });
    }

    editUser(username, oldType, newType){
        return new Promise((resolve, reject) => {
            const sql = "UPDATE USER_TABLE SET "
                        +
                        "TYPE = ? "
                        +
                        "WHERE USERNAME = ? AND TYPE = ?";
            this.db.run(sql, [newType, username, oldType], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('ok');
                }
            });
        });
    }

    deleteUser(username, type) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM USER_TABLE WHERE USERNAME = ? AND TYPE = ?";
            this.db.run(sql, [username, type], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('OK');
                }
            });
        });
    }
}

module.exports = UserDAO;