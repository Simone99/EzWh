var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');

router.get('/userinfo', function(req, res, next) {
  const w = new Warehouse();
  res.send(w.hello_Simone());
});

module.exports = router;
