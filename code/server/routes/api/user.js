var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const User = require('../../classes/User');
const { body, validationResult, check } = require('express-validator');

hashCode = function(s) {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

router.get('/users', async (req, res) => {
  try{
  const users = await new Warehouse().getUserList();
  return res.status(200).json(users);
}catch(err){
  return res.status(500).end();
}
});

router.post('/newUser', async (req, res) => {
  if(!req.body.hasOwnProperty('name') ||
     !req.body.hasOwnProperty('surname') ||
     !req.body.hasOwnProperty('type') ||
     !req.body.hasOwnProperty('username') ||
     !req.body.hasOwnProperty('password') ||
      req.body.password.length < 8 ||
      req.body.type == 'manager' ||
      req.body.type == 'administrator'){
    return res.status(422).end();
  }
  try{
    const tmp = await new Warehouse().addUser(new User(req.body.name, req.body.surname, req.body.type, req.body.username, hashCode(req.body.password)));
    if (tmp === 409) {
      return res.status(409).end();
    }
    return res.status(201).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.get('/suppliers', async (req, res) => {
  try{
  const suppliers = await new Warehouse().getSupplierList();
  return res.status(200).json(suppliers);
}catch(err){
  return res.status(500).end();
}
});

router.put('/users/:username', async (req, res) => {
  if(!req.body.hasOwnProperty('oldType') ||
    !req.body.hasOwnProperty('newType') ||
    !req.params.hasOwnProperty('username') ||
    req.body.newType == 'manager' ||
    req.body.newType == 'administrator') {
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
    req.params.type == 'manager' ||
    req.params.type == 'administrator') {
    return res.status(422).end();
  }
  try{
    await new Warehouse().deleteUser(req.params.username, req.params.type);
    return res.status(204).end();
  }catch(err){
    return res.status(503).end();
  }
});

router.post('/managerSessions', [check('username').isEmail(), check('password').isLength({min:8})], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).end();
  }
  try{
    const user = await new Warehouse().getUser(req.body.username, 'manager');
    if(user === undefined){
      return res.status(404).end();
    }
    return res.status(200).json({
      id : user.getId(),
      name : user.getName(),
      surname : user.getSurname(),
      username : user.getUsername(),
      password : user.getPassword()
    });
  }catch(err){
    return res.status(500).end();
  }
});

router.post('/customerSessions', [check('username').isEmail(), check('password').isLength({min:8})], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).end();
  }
  try{
    const user = await new Warehouse().getUser(req.body.username, 'customer');
    if(user === undefined){
      return res.status(404).end();
    }
    return res.status(200).json({
      id : user.getId(),
      name : user.getName(),
      surname : user.getSurname(),
      username : user.getUsername(),
      password : user.getPassword()
    });
  }catch(err){
    return res.status(500).end();
  }
});

router.post('/supplierSessions', [check('username').isEmail(), check('password').isLength({min:8})], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).end();
  }
  try{
    const user = await new Warehouse().getUser(req.body.username, 'supplier');
    if(user === undefined){
      return res.status(404).end();
    }
    return res.status(200).json({
      id : user.getId(),
      name : user.getName(),
      surname : user.getSurname(),
      username : user.getUsername(),
      password : user.getPassword()
    });
  }catch(err){
    return res.status(500).end();
  }
});

router.post('/clerkSessions', [check('username').isEmail(), check('password').isLength({min:8})], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).end();
  }
  try{
    const user = await new Warehouse().getUser(req.body.username, 'clerk');
    if(user === undefined){
      return res.status(404).end();
    }
    return res.status(200).json({
      id : user.getId(),
      name : user.getName(),
      surname : user.getSurname(),
      username : user.getUsername(),
      password : user.getPassword()
    });
  }catch(err){
    return res.status(500).end();
  }
});

router.post('/qualityEmployeeSessions', [check('username').isEmail(), check('password').isLength({min:8})], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).end();
  }
  try{
    const user = await new Warehouse().getUser(req.body.username, 'qualityEmployee');
    if(user === undefined){
      return res.status(404).end();
    }
    return res.status(200).json({
      id : user.getId(),
      name : user.getName(),
      surname : user.getSurname(),
      username : user.getUsername(),
      password : user.getPassword()
    });
  }catch(err){
    return res.status(500).end();
  }
});

router.post('/deliveryEmployeeSessions', [check('username').isEmail(), check('password').isLength({min:8})], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).end();
  }
  try{
    const user = await new Warehouse().getUser(req.body.username, 'deliveryEmployee');
    if(user === undefined){
      return res.status(404).end();
    }
    return res.status(200).json({
      id : user.getId(),
      name : user.getName(),
      surname : user.getSurname(),
      username : user.getUsername(),
      password : user.getPassword()
    });
  }catch(err){
    return res.status(500).end();
  }
});

router.post('/logout', async (req, res) => {
  try{
    return res.status(200).end();
  }catch(err){
    return res.status(500).end();
  }
});

module.exports = router;
