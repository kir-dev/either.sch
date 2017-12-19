var _ = require('../public/assets/js/lodash.js');
var express = require('express');
var admincheck = require('../modules/admincheck');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/login');
});

router.post('/', admincheck, function(req, res) {
  res.redirect('/admin/list');
});

router.get('/list', admincheck, function (req, res, next) {
  res.render('admin/list');
});

module.exports = router;
