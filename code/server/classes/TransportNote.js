const dayjs = require("dayjs");
class TransportNote{
    constructor(){
        this.shipmentDate = dayjs();
    }

}

module.exports = TransportNote;