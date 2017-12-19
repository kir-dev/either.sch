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
  dal.Question.find({}, function(err, doc) {
    res.render('admin/list', { questions: doc });
  });
});

router.post('/nonsch', admincheck, function (req, res) {
  var id = req.body.id;
  dal.Question.update({ _id: id }, { group: "general" }, function (err, doc) {
    res.sendStatus(200);
  });
});

router.post('/delete', admincheck, function (req, res) {
  var id = req.body.id;
  dal.Question.findOne({ _id: id }).remove(function (err, doc) {
    res.sendStatus(200);
  });
});

module.exports = router;
