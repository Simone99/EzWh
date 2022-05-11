const sqlite = require('sqlite3');

class TestDescriptorDAO{

    constructor(db){
        this.db = db;
    }

    checkSKUID(idTestDescriptor, SKUID) {
        new Promise((resolve, reject) => {
            const sql = "SELECT * FROM TESTDESCRIPTOR_TABLE WHERE ID = ? AND SKUID = ?";
            this.db.get(sql, [idTestDescriptor, SKUID], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(404);
                    return;
                }
                resolve('ok');
            });
        });
    }
    
}

module.exports = TestDescriptorDAO;