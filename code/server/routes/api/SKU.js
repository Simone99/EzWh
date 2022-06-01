var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const Inventory = require('../../classes/Inventory');
const SKU = require('../../classes/SKU');

router.get('/skus', async (req, res) => {
  try{
    const skus = await new Warehouse().getInventory().getSKUList();
    return res.status(200).json(skus);
  }catch(err){
    return res.status(500).end();
  }
});

router.get('/skus/:id', async (req, res) => {
  if(isNaN(parseInt(req.params.id))){
    return res.status(422).end();
  }
  try{
    const sku = await new Warehouse().getInventory().searchSKU(req.params.id);
    if(sku === undefined){
      return res.status(404).end();
    }
    return res.status(200).json(sku);
  }catch(err){
    return res.status(500).end(); 
  }
});

router.post('/sku', async (req, res) => {
  if(!req.body.hasOwnProperty('description') ||
     !req.body.hasOwnProperty('weight') ||
     !req.body.hasOwnProperty('volume') ||
     !req.body.hasOwnProperty('price') ||
     !req.body.hasOwnProperty('notes') ||
     !req.body.hasOwnProperty('availableQuantity')){
    return res.status(422).end()
  }
  try{
    await new Warehouse().getInventory().addSKU(new SKU(req.body.description, req.body.weight, req.body.volume, req.body.price, req.body.notes, null, null, req.body.availableQuantity));
    return res.status(201).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.put('/sku/:id', async (req, res) => {
  if(!req.body.hasOwnProperty('newDescription') ||
     !req.body.hasOwnProperty('newWeight') ||
     !req.body.hasOwnProperty('newVolume') ||
     !req.body.hasOwnProperty('newPrice') ||
     !req.body.hasOwnProperty('newNotes') ||
     !req.body.hasOwnProperty('newAvailableQuantity')){
    return res.status(422).end()
  }
  try{
    const tmp = await new Warehouse().getInventory().editSKU(req.params.id, req.body.newDescription, req.body.newWeight, req.body.newVolume, req.body.newNotes, req.body.newPrice, req.body.newAvailableQuantity);
    if(tmp === 422){
      return res.status(422).end();
    }else if(tmp === 404){
      return res.status(404).end();
    }
    return res.status(200).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.put('/sku/:id/position', async (req, res) => {
  if(!req.body.hasOwnProperty('position'))
    return res.status(422).end();
  try{
    const tmp = await new Warehouse().getInventory().editSKUPosition(req.params.id, req.body.position);
    if(tmp === 422){
      return res.status(422).end();
    }else if(tmp === 404){
      return res.status(404).end();
    }
    return res.status(201).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.delete('/skus/:id', async (req, res) => {
  if(isNaN(parseInt(req.params.id))){
    return res.status(422).end();
  }
  try{
    await new Warehouse().getInventory().deleteSKU(req.params.id);
    return res.status(204).end();
  }catch(err){
    return res.status(503).end();
  }
});

module.exports = router;