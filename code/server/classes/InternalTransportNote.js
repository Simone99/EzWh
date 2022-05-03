class InternalTransportNote{
    constructor(){
        this.shipmentDate = dayjs();
    }

    setDate(shipmentDate) {
		this.shipmentDate = dayjs(shipmentDate, "YYYY/MM/DD");
		return;
	}

}

module.exports = InternalTransportNote;