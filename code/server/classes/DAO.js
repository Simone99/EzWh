const sqlite = require('sqlite3');
const UserDAO = require('./DAOs/UserDAO');
const InternalOrderDAO = require('./DAOs/InternalOrderDAO');
const ItemDAO = require('./DAOs/ItemDAO');
const PositionDAO = require('./DAOs/PositionDAO');
const RestockOrderDAO = require('./DAOs/RestockOrderDAO');
const ReturnOrderDAO = require('./DAOs/ReturnOrderDAO');
const SKUDAO = require('./DAOs/SKUDAO');
const SKUItemDAO = require('./DAOs/SKUItemDAO');
const TestDescriptorDAO = require('./DAOs/TestDescriptorDAO');
const TestResultDAO = require('./DAOs/TestResultDAO');
class DAO{

    sqlite = require('sqlite3');
    
    constructor(dbname){
        this.db = new sqlite.Database(dbname, err =>{
            if(err) throw err;
        });
        this.UserDAO = new UserDAO(this.db);
        this.InternalOrderDAO = new InternalOrderDAO(this.db);
        this.ItemDAO = new ItemDAO(this.db);
        this.PositionDAO = new PositionDAO(this.db);
        this.RestockOrderDAO = new RestockOrderDAO(this.db);
        this.ReturnOrderDAO = new ReturnOrderDAO(this.db);
        this.SKUDAO = new SKUDAO(this.db);
        this.SKUItemDAO = new SKUItemDAO(this.db);
        this.TestDescriptorDAO = new TestDescriptorDAO(this.db);
        this.TestResultDAO = new TestResultDAO(this.db);
    }

    async getAllPositions(){
        return await this.PositionDAO.getAllPositions();
    }

}

module.exports = DAO;