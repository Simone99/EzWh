var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const User = require('../../classes/User');

hashCode = function(s) {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

router.get('/users', async (req, res) => {
  const users = await new Warehouse().getUserList();
  return res.status(200).json(users);
});

router.post('/newUser', async (req, res) => {
  if(!req.body.hasOwnProperty('name') ||
     !req.body.hasOwnProperty('surname') ||
     !req.body.hasOwnProperty('type') ||
     !req.body.hasOwnProperty('username') ||
     !req.body.hasOwnProperty('password') ||
      req.body.password.length < 8 ||
      req.body.type == 'Manager' ||
      req.body.type == 'Administrator'){
    return res.status(422).end();
  }
  try{
    const tmp = await new Warehouse().addUser(new User(req.body.name, req.body.surname, req.body.type, req.body.username, hashCode(req.body.password), null));
    if (tmp === 409) {
      return res.status(409).end();
    }
    return res.status(201).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.get('/suppliers', async (req, res) => {
  const suppliers = await new Warehouse().getSupplierList();
  return res.status(200).json(suppliers);
});

router.put('/users/:username', async (req, res) => {
  if(!req.body.hasOwnProperty('oldType') ||
    !req.body.hasOwnProperty('newType') ||
    !req.params.hasOwnProperty('username') ||
    req.body.oldType == 'Manager' ||
    req.body.oldType == 'Administrator') {
    return res.status(422).end();
  }
  try{
    const tmp = await new Warehouse().editUser(req.params.username, req.body.oldType, req.body.newType);
    if(tmp === 404){
      return res.status(404).end();
    }
    return res.status(201).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.delete('/users/:username/:type', async (req, res) => {
  if(!req.params.hasOwnProperty('type') ||
    !req.params.hasOwnProperty('username') ||
    req.body.type == 'Manager' ||
    req.body.type == 'Administrator') {
    return res.status(422).end();
  }
  try{
    await new Warehouse().deleteUser(req.params.username, req.params.type);
    return res.status(204).end();
  }catch(err){
    return res.status(503).end();
  }
});

module.exports = router;
