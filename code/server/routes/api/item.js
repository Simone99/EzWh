var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const Item = require('../../classes/Item');

router.get('/items', async (req, res) => {
    try{
        console.log('1');
        const items = await new Warehouse().getInventory().getItemList();
        return res.status(200).json(items);
    } catch(err) {
        return res.status(500).end();
    }
});

  router.get('/items/:id', async (req, res) => {
      if(!req.params.hasOwnProperty('id')) {
        return res.status(422).end();
      }
    try{
        const item = await new Warehouse().getInventory().getItemById(req.params.id);
        if(item === undefined){
          return res.status(404).end();
        }
        return res.status(200).json(item);
      }catch(err){
        return res.status(503).end();
      }
});

router.post('/item', async (req, res) => {
    if(!req.body.hasOwnProperty('description') ||
       !req.body.hasOwnProperty('price') ||
       !req.body.hasOwnProperty('SKUId') ||
       !req.body.hasOwnProperty('supplierId')){
      return res.status(422).end();
    }
    try{
      newItem = await new Warehouse().getInventory().addItem(new Item(req.body.description, req.body.price, req.body.supplierId, req.body.SKUId));
      if (newItem === 422) {
        return res.status(422).end();
      }
      return res.status(201).end();
    }catch(err){
      return res.status(503).end();
    }
  });

module.exports = router;