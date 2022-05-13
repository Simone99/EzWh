class Position {
	constructor(aisle, row, col, maxWeight, maxVolume, occupiedWeight = 0, occupiedVolume = 0) {
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		this.aisle = aisle;
		this.row = row;
		this.col = col;
		this.maxWeight = maxWeight;
		this.maxVolume = maxVolume;
		this.occupiedWeight = occupiedWeight;
		this.occupiedVolume = occupiedVolume;
	}

	setAisle(aisle) {
		//TODO check if the format is correct
		this.aisle = aisle;
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		//check duplicates
	}

	setRow(row) {
		//TODO check if the format is correct
		this.row = row;
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		//check duplicates
	}

	setCol(col) {
		//TODO check if the format is correct
		this.col = col;
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		//check duplicates
	}

	setPositionID(positionID) {
		//TODO check if the format is correct
		this.positionID = positionID;
		this.aisle = parseInt(positionID.substring(0, 3));
		this.row = parseInt(positionID.substring(4, 7));
		this.col = parseInt(positionID.substring(8, 11));
		//check duplicates
	}

	getMaxWeight(){
		return this.maxWeight;
	}

	getMaxVolume(){
		return this.maxVolume;
	}

	getPositionID(){
		return this.positionID;
	}

}

module.exports = Position;
