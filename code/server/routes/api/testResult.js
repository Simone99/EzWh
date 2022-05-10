var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const TestResult = require('../../classes/TestResult');

router.get('/skuitems/:rfid/testResults', async (req, res) => {
    if(!req.params.hasOwnProperty('rfid')) {
        return res.status(422).end();
    }
    try{
        const testResults = await new Warehouse().getInventory().getTestResultsByRFID(req.params.rfid);
        if(testResults === 404){
          return res.status(404).end();
        }
        return res.status(200).json(testResults);
      }catch(err){
        return res.status(500).end();
      }
    
});

module.exports = router;