var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const SKUItem = require('../../classes/SKUItem');

router.get('/skuitems', async (req, res) => {
    try{
        const skuitemslist = await new Warehouse().getInventory().getSKUItems();
        return res.status(200).json(skuitemslist);
    }catch(err){
        return res.status(500).end();
    }
});

router.get('/skuitems/sku/:id', async (req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.status(422).end();
    }
    try{
        const skuitemsAvailable = await new Warehouse().getInventory().getSKUItemsAvailable(req.params.id, 1);
        if(skuitemsAvailable === 404){
            return res.status(404).end();
        }
        return res.status(200).json(skuitemsAvailable);
    }catch(err){
        return res.status(500).end();
    }
});

router.get('/skuitems/:rfid', async (req, res) => {
    if(isNaN(parseInt(req.params.rfid))){
        return res.status(422).end();
    }
    try{
        const skuItem = await new Warehouse().getInventory().searchSKUItem(req.params.rfid);
        if(skuItem === 404){
            return res.status(404).end();
        }
        return res.status(200).json(skuItem);
    }catch(err){
        return res.status(500).end();
    }
});

router.post('/skuitem', async (req, res) => {
    if(!req.body.hasOwnProperty('RFID') ||
        !req.body.hasOwnProperty('SKUId') ||
        !req.body.hasOwnProperty('DateOfStock')){
        return res.status(422).end()
    }
    try{
        const result = await new Warehouse().getInventory().addSKUItem(new SKUItem(req.body.SKUId, 0, req.body.DateOfStock, req.body.RFID));
        if(result === 404){
            return res.status(404).end();
        }
        return res.status(201).end();
    }catch(err){
        return res.status(503).end();
    }

});

router.put('/skuitems/:rfid', async (req, res) => {
    if(!req.body.hasOwnProperty('newRFID') ||
        !req.body.hasOwnProperty('newAvailable') ||
        !req.body.hasOwnProperty('newDateOfStock')){
        return res.status(422).end()
    }
    try{
        const result = await new Warehouse().getInventory().editSKUItem(req.body.newRFID, req.body.newAvailable, req.body.newDateOfStock, req.params.rfid);
        if(result === 404){
            return res.status(404).end();
        }
        return res.status(200).end();
    }catch(err){
        return res.status(503).end();
    }
});

router.delete('/skuitems/:rfid', async (req, res) => {
    if(isNaN(parseInt(req.params.rfid))){
        return res.status(422).end();
    }
    try{
        await new Warehouse().getInventory().deleteSKUItem(req.params.rfid);
        return res.status(204).end();
    }catch(err){
        return res.status(503).end();
    }
});

module.exports = router;