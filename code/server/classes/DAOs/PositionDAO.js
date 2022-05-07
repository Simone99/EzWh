const sqlite = require('sqlite3');
const Position = require('../Position');

class PositionDAO{

    constructor(db){
        this.db = db;
    }

    getAllPositions(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM POSITION_TABLE";
            this.db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const positions = rows.map(row => {
                    return new Position(row.AISLE, row.ROW, row.COL, row.MAX_WEIGHT, row.MAX_VOLUME, row.OCCUPIED_WEIGHT, row.OCCUPIED_VOLUME);
                });
                resolve(positions);
            });
        });
    }
    
}

module.exports = PositionDAO;