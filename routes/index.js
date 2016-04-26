var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WristBand' });
});

router.get('/chart', function(req, res, next) {
  res.render('chart', { title: 'WristBand' });
});


router.get('/graph', function(req, res, next) {
  res.render('graph', { title: 'WristBand' });
});

router.get('/wristgraph', function(req, res, next) {
  res.render('wristGraph', { title: 'WristBand' });
});

router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'WristBand' });
});

module.exports = router;
