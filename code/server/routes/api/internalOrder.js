var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const InternalOrder = require('../../classes/InternalOrder');

router.get('/internalOrders', async (req, res) => {
    try {
        const internalOrders = await new Warehouse().getInternalOrdersList();
        return res.status(200).json(internalOrders);
    } catch (err) {
        return res.status(500).end();
    }

});

router.get('/internalOrdersIssued', async (req, res) => {
    try {
        const internalOrdersIssued = await new Warehouse().getInternalOrdersIssuedList();
        return res.status(200).json(internalOrdersIssued);
    } catch (err) {
        return res.status(500).end();
    }
})

router.get('/internalOrdersAccepted', async (req, res) => {
    try {
        const internalOrdersAccepted = await new Warehouse().getInternalOrdersAcceptedList();
        return res.status(200).json(internalOrdersAccepted);
    } catch (err) {
        return res.status(500).end();
    }
})

/*to check!!!*/
router.get('/internalOrders/:id', async (req, res) => {
    try {
        if (isNaN(parseInt(req.params.id))) {
            return res.status(422).end();
        }

        const io = await new Warehouse().getInternalOrder(req.params.id);
        if (io === undefined) {
            return res.status(404).end();
        }

        return req.status(200).json(io);
    } catch (err) {
        return res.status(500).end();
    }
})

router.post('/internalOrders', async (req, res) => {
    if (!req.body.hasOwnProperty('id') ||
        !req.body.hasOwnProperty('state') ||
        !req.body.hasOwnProperty('ITN') ||
        !req.body.hasOwnProperty('customerID')) {
        return res.status(422).end()
    }
    try {
        await new Warehouse().addInternalOrder(new InternalOrder(req.body.id, req.body.state, req.body.ITN, req.body.customerID));
        return res.status(201).end();
    } catch (err) {
        return res.status(503).end();
    }
})

/*complete with products*/
router.put('/internalOrders/:id', async (req, res) => {
    if (!req.body.hasOwnProperty('newState')) {
        return res.status(422).end()
    }
    try {
        await new Warehouse().editInternalOrder(req.params.id, req.body.newState, req.body.products);
        return res.status(200).end();
    } catch (err) {
        return res.status(503).end();
    }
})

router.delete('/internalOrders/:id', async (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(422).end();
    }
    try {
        await new Warehouse().deleteInternalOrder(req.params.id);
        return res.status(204).end();
    }catch(err) {
        return res.status(503).end();
    }
})

module.exports = router;