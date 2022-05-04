const dayjs = require("dayjs");
class TransportNote{
    constructor(){
        this.shipmentDate = dayjs();
    }

    setDate(shipmentDate) {
		this.shipmentDate = dayjs(shipmentDate, "YYYY/MM/DD");
		return;
	}
}

module.exports = TransportNote;