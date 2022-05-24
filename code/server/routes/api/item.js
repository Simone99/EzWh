var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const Item = require('../../classes/Item');

router.get('/items', async (req, res) => {
	try {
		const items = await new Warehouse().getItemList();
		return res.status(200).json(items);
	} catch (err) {
		return res.status(500).end();
	}
});

router.get('/items/:id', async (req, res) => {
	//TODO ISNAN
	if (!req.params.hasOwnProperty('id')) {
		return res.status(422).end();
	}
	try {
		const item = await new Warehouse().getItemById(req.params.id);
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
		!req.body.hasOwnProperty('description') ||
		!req.body.hasOwnProperty('price') ||
		!req.body.hasOwnProperty('SKUId') ||
		!req.body.hasOwnProperty('supplierId') ||
		req.body.price < 0
	) {
		return res.status(422).end();
	}
	try {
		newItem = await new Warehouse().addItem(
			new Item(
				req.body.description,
				req.body.price,
				req.body.supplierId,
				req.body.SKUId
			)
		);
		if (newItem === 422) {
			return res.status(422).end();
		}
		return res.status(201).end();
	} catch (err) {
		return res.status(503).end();
	}
});

router.put('/item/:id', async (req, res) => {
	if (
		isNaN(parseInt(req.params.id)) ||
		!req.body.hasOwnProperty('newDescription') ||
		!req.body.hasOwnProperty('newPrice') ||
		req.body.newPrice < 0
	) {
		return res.status(422).end();
	}
	try {
		updatedItem = await new Warehouse().editItem(
			req.params.id,
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

router.delete('/item/:id', async (req, res) => {
	if (isNaN(parseInt(req.params.id))) {
		return res.status(422).end();
	}
	try {
		new Warehouse().deleteItem(req.params.id);
		return res.status(204).end();
	} catch (err) {
		return res.status(503).end();
	}
});

module.exports = router;
