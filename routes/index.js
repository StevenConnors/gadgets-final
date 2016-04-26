var express = require('express');
var router = express.Router();


// Render home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WristBand' });
});

// Render the page with the graphs
router.get('/graph', function(req, res, next) {
  res.render('graph', { title: 'WristBand' });
});

// Render the page with the Wrist display
router.get('/wristgraph', function(req, res, next) {
  res.render('wristGraph', { title: 'WristBand' });
});

// Renders the demo page, where users can see the recognition
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'WristBand' });
});

// Renders the full demo page, where users can do actions
router.get('/fulldemo', function(req, res, next) {
  res.render('fulldemo', { title: 'WristBand' });
});

module.exports = router;
