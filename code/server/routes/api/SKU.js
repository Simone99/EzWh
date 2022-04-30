var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/skus', function(req, res, next) {
    res.send('w.hello_Simone()');
  });

module.exports = router;