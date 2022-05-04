var express = require('express');
const app = require('../../server');
var router = express.Router();

const Warehouse = require('./../classes/Warehouse')

app.get('/positions', (req, res) => {
    let positionList = new Warehouse().printPositionList();
    return res.status(200).json(positionList);
});
module.exports = router;