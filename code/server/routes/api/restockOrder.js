var express = require('express');
const restockOrder = require('../../classes/RestockOrder');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');

router.get('/restockOrders', async (req, res) => {
    try {
        const restockorderslist = await new Warehouse().getRestockOrderList();

        if (restockorderslist === 401) {
            return res.status(401).end();
        }
        return res.status(200).json(restockorderslist);
    } catch (err) {
        return res.status(500).end();
    }
})

router.get('/restockOrdersIssued', async (req, res) => {
    try {
        const restockordersissued = await new Warehouse().getAllRestockOrdersIssued();

        if (restockordersissued === 401) {
            return res.status(401).end();
        }
        return res.status(200).json(restockordersissued);
    } catch (err) {
        return res.status(500).end();
    }
})

router.get('/restockOrders/:id', async (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(422).end();
    }
    try {
        const restockorderAvailable = await new Warehouse().getRestockOrderByID(req.params.id);

        if (restockorderAvailable === 401) {
            return res.status(401).end();
        }
        if (restockorderAvailable === 404) {
            return res.status(404).end();
        }
        return res.status(200).json(restockorderAvailable);
    } catch (err) {
        return res.status(500).end();
    }
})

router.get('/restockOrders/:id/returnItems', async (req, res) => {
    const restockorderSKUItemsList = await new Warehouse().getSKUItemsWithNegTest(req.params.id);

    if (isNaN(parseInt(req.params.id))) {
        return res.status(422).end();
    }
    try {
        if (restockorderSKUItemsList === 401) {
            return res.status(401).end();
        }
        if (restockorderSKUItemsList === 404) {
            return res.status(404).end();
        }
        return res.status(200).json(restockorderSKUItemsList);
    } catch (err) {
        return res.status(500).end();
    }

})

router.post('/restockOrder', async (req, res) => {
    if (!req.body.hasOwnProperty('issueDate') ||
        !req.body.hasOwnProperty('products') ||
        !req.body.hasOwnProperty('supplierId')) {
        return res.status(422).end();
    }
    try {
        const result = await new Warehouse().addRestockOrder(new restockOrder(req.body.id, req.body.userID));
        if (result === 422) {
            return res.status(422).end();
        }
        return res.status(201).end();
    } catch (err) {
        return res.status(503).end();
    }
})

router.put('/restockOrder/:id', async (req, res) => {
    try {
        const tmp = await new Warehouse().editRestockOrderState(req.params.id, req.body.newState);
        if (tmp === 422) {
            return res.status(422).end();
        } else if (tmp === 404) {
            return res.status(404).end();
        }

        return res.status(200).end();
    } catch (err) {
        console.log(err);
        return res.status(503).end();
    }
})

router.put('/restockOrder/:id/skuItems', async (req, res) => {
    /*Completare*/
})

/*Infinite request inside setTransportNote in RestockOrderDao */
router.put('/restockOrder/:id/transportNote', async (req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.status(422).end();
    }
    try {
        const tmp = await new Warehouse().setTransportNote(req.params.id, req.body.transportNote);
        if (tmp === 422) {
            return res.status(422).end();
        } else if (tmp === 404) {
            return res.status(404).end();
        }

        return res.status(200).end;
    } catch (err) {
        return res.status(503).end();
    }
})

router.delete('/restockOrder/:id', async (req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.status(422).end();
    }
    try{
        await new Warehouse().deleteRestockOrder(req.params.id);
        return res.status(204).end();
    }catch(err){
        return res.status(503).end();
    }
})


module.exports = router;