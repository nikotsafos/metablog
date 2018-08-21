var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('articles/index');
})

router.get('/new', function(req, res){
  res.render('articles/new');
});

router.get('/:id', function(req, res) {
  res.send('article show page goes here');
});

router.post('/', function(req, res) {
  res.send('/articles post route reached');
});


module.exports = router;
