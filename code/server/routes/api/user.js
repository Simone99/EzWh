var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const User = require('../../classes/User');

router.get('/users', async (req, res) => {
  const users = await new Warehouse().getInventory().getUserList();
  return res.status(200).json(users);
  //TODO : eliminate managers
});

router.post('/newUser', async (req, res) => {
  if(!req.body.hasOwnProperty('name') ||
     !req.body.hasOwnProperty('surname') ||
     !req.body.hasOwnProperty('type') ||
     !req.body.hasOwnProperty('username') ||
     !req.body.hasOwnProperty('password')){
    return res.status(422).end();
  }
  try{
    const tmp = await new Warehouse().getInventory().addUser(new User(req.body.name, req.body.surname, req.body.type, req.body.username, req.body.password, null));
    if (tmp === 409) {
      return res.status(409).end();
    }
    return res.status(201).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.get('/suppliers', async (req, res) => {
  const suppliers = await new Warehouse().getInventory().getSupplierList();
  return res.status(200).json(suppliers);
});

router.put('/users/:username', async (req, res) => {
  if(!req.body.hasOwnProperty('type') ||
     !req.params.hasOwnProperty('username')) {
    return res.status(422).end();
  }
  try{
    const tmp = await new Warehouse().getInventory().editUser(req.params.id, req.body.newDescription, req.body.newWeight, req.body.newVolume, req.body.newNotes, req.body.newPrice, req.body.newAvailableQuantity);
    if(tmp === 422){
      return res.status(422).end();
    }else if(tmp === 404){
      return res.status(404).end();
    }
  }catch(err){
    return res.status(503).end();
  }
});

module.exports = router;
