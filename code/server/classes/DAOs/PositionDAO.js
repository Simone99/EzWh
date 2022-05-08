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
    
    getPosition(positionID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM POSITION_TABLE WHERE ID = ?";
            this.db.get(sql, [positionID], (err, row) => {
                if(err){
                    reject(err);
                    return
                }
                if(row === undefined){
                    resolve(undefined);
                    return;
                }
                resolve(new Position(row.AISLE, row.ROW, row.COL, row.MAX_WEIGHT, row.MAX_VOLUME, row.OCCUPIED_WEIGHT, row.OCCUPIED_VOLUME));
            });
        });
    }

    updatePosition(positionID, newOccupiedVolume, newOccupiedWeight){
        return new Promise((resolve, reject) => {
            const sql = "UPDATE POSITION_TABLE SET OCCUPIED_WEIGHT = ?, OCCUPIED_VOLUME = ? WHERE ID = ?";
            this.db.run(sql, [newOccupiedWeight, newOccupiedVolume, positionID], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('OK');
                }
            });
        });
    }
}

module.exports = PositionDAO;