var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: '欢迎哦~?',name : "李珍" });
  res.render('lzz', { title: '欢迎哦~?',name : "李珍" });
});

module.exports = router;
