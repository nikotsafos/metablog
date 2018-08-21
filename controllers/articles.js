var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  db.article.findAll().then(function(allArticles){
    res.render('articles/index', {articles: allArticles});
  }).catch(function(err){
    console.log(err);
    res.send('bad things happened')
  })
  });

router.get('/new', function(req, res){
  db.author.findAll().then(function(allAuthors){
    res.render('articles/new', {authors: allAuthors});
  }).catch(function(err){
    console.log(err);
    res.send('oops1')
  })
});

router.get('/:id', function(req, res) {
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author]
  }).then(function(foundArticle){
    res.render('articles/show', {article: foundArticle});
  }).catch(function(err){
    console.log(err);
    res.send('oops2')
  })
});

router.post('/', function(req, res) {
  console.log(req.body);
  if (req.body.authorId >=0) {
  db.article.create(req.body).then(function(createdArticle){
      res.redirect('/articles/' + createdArticle.id);
  }).catch(function(err){
    console.log(err);
    res.send('oops3')
  })
} else {
  res.redirect('/articles/new')
}
});


module.exports = router;
