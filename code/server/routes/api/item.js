var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const Item = require('../../classes/Item');
const { newItem } = require('../../acceptanceTest/utils-items');

router.get('/items', async (req, res) => {
	try {
		const items = await new Warehouse().getItemList();
		return res.status(200).json(items);
	} catch (err) {
		return res.status(500).end();
	}
});

router.get('/items/:id/:supplierId', async (req, res) => {
	if (isNaN(parseInt(req.params.id)) ||
		isNaN(parseInt(req.params.supplierId)) ) {
		return res.status(422).end();
	}
	try {
		const item = await new Warehouse().getItemById(req.params.id, req.params.supplierId);
		if (item === undefined) {
			return res.status(404).end();
		}
		return res.status(200).json(item);
	} catch (err) {
		return res.status(503).end();
	}
});

router.post('/item', async (req, res) => {
	if (
		!Object.prototype.hasOwnProperty.call(req.body, 'id') ||
		isNaN(parseInt(req.body.id)) ||
		!Object.prototype.hasOwnProperty.call(req.body, 'description') ||
		!Object.prototype.hasOwnProperty.call(req.body, 'price') ||
		!Object.prototype.hasOwnProperty.call(req.body, 'SKUId') ||
		!Object.prototype.hasOwnProperty.call(req.body, 'supplierId') ||
		req.body.price < 0
	) {
		return res.status(422).end();
	}
	try {
		const newItem = await new Warehouse().addItem(
			new Item(
				req.body.description,
				req.body.price,
				req.body.supplierId,
				req.body.SKUId,
				req.body.id
			)
		);
		if (newItem === 422) {
			return res.status(422).end();
		}
		if (newItem === 404) {
			return res.status(404).end();
		}
		return res.status(201).end();
	} catch (err) {
		console.log(err);
		return res.status(503).end();
	}
});

router.put('/item/:id/:supplierId', async (req, res) => {
	if (
		isNaN(parseInt(req.params.id)) ||
		!Object.prototype.hasOwnProperty.call(req.body, 'newDescription') ||
		!Object.prototype.hasOwnProperty.call(req.body, 'newPrice') ||
		isNaN(parseInt(req.params.supplierId)) ||
		req.body.newPrice < 0
	) {
		return res.status(422).end();
	}
	try {
		updatedItem = await new Warehouse().editItem(
			req.params.id,
			req.params.supplierId,
			req.body.newDescription,
			req.body.newPrice
		);
		if (updatedItem === 404) {
			return res.status(404).end();
		}
		return res.status(200).end();
	} catch (err) {
		return res.status(503).end();
	}
});

router.delete('/items/:id/:supplierId', async (req, res) => {
	if (isNaN(parseInt(req.params.id)) ||
		isNaN(parseInt(req.params.supplierId))) {
		return res.status(422).end();
	}
	try {
		new Warehouse().deleteItem(req.params.id, req.params.supplierId);
		return res.status(204).end();
	} catch (err) {
		return res.status(503).end();
	}
});

module.exports = router;
