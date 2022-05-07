var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse')

router.get('/positions', async (req, res) => {
    let positionList = await new Warehouse().printPositionList();
    return res.status(200).json(positionList);
});

module.exports = router;