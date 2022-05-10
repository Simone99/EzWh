var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');

router.get('/restockOrders', async (req, res) => {
    try{
        const restockorderslist = await new Warehouse().getRestockOrderList();

        if(restockorderslist === 401){
            return  res.status(401).end();
        }
        return res.status(200).json(restockorderslist);
    }catch(err){
        return res.status(500).end();
    }
})

router.get('/restockOrdersIssued', async (req, res) => {
    try{
        const restockordersissued = await new Warehouse().getRestockOrderList().filter((resOrd) => resOrd.getState() == "issued");

        if(restockordersissued === 401){
            return res.status(401).end();
        }
        return res.status(200).json(restockordersissued);
    }catch(err){
        return res.status(500).end();
    }
})

router.get('/restockOrders/:id', async (req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.status(422).end();
    }
    try{
        const restockorderAvailable = await new Warehouse().getRestockOrder(req.params.id);

        if(restockorderAvailable === 401){
            return res.status(401).end();
        }
        if(restockorderAvailable === 404){
            return res.status(404).end();
        }
        return res.status(200).json(restockorderAvailable);
    }catch(err){
        return res.status(500).end();
    }
})

router.get('/restockOrders/:id/returnItems', async (req, res) => {
    const restockorderSKUItemsList = await new Warehouse().getRestockOrderList().getRestockOrder(req.params.id).getAllSKUItems();

    if(isNaN(parseInt(req.params.id))){
        return res.status(422).end();
    }
    try{
        if(restockorderSKUItemsList === 401){
            return res.status(401).end();
        }
        if(restockorderSKUItemsList === 404){
            return res.status(404).end();
        }
        return res.status(200).json(restockorderSKUItemsList);
    }catch(err){
        return res.status(500).end();
    }
    
})


module.exports = router;