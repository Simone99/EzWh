class DAO{

    sqlite = require('sqlite3');
    
    constructor(dbname){
        this.db = new this.sqlite.Database(dbname, err =>{
            if(err) throw err;
        });
    }

}

module.exports = DAO;