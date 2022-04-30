var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');

/* GET users listing. */
router.get('/userinfo', function(req, res, next) {
  const w = new Warehouse();
  res.send(w.hello_Simone());
});

module.exports = router;
