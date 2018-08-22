var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  db.article.findAll().then(function(allArticles){
    res.render('articles/index', {articles: allArticles});
  }).catch(function(err){
    res.render('error')
  })
  });

router.get('/new', function(req, res){
  db.author.findAll().then(function(allAuthors){
    res.render('articles/new', {authors: allAuthors});
  }).catch(function(err){
    console.log(err);
    res.render('error')
  })
});

router.get('/:id', function(req, res) {
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author, db.comment, db.tag]
  }).then(function(foundArticle){
    db.author.findAll().then(function(allAuthors){
      res.render('articles/show', {article: foundArticle, authors: allAuthors});
    }).catch(function(err){
    console.log(err);
    res.render('error')
  });
  }).catch(function(err){
    console.log(err);
    res.render('error')
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  if (req.body.authorId >=0) {
  db.article.create(req.body).then(function(createdArticle){
    var tags = [];
    if(req.body.tags){
      tags = req.body.tags.split(',');
    }
    if(tags.length >0){
      // loop through tags, create if needed then add relation in jion table
      async.forEach(tags, function(t, done){
        // this code runs for each individual tag we need to add
          db.tag.findOrCreate({
            where: {name:t.trim()}
          }).spread(function(newTag, wasCreated){
            createdArticle.addTag(newTag).then(function(){
            done(); // tells async this iteration is all finished
          });
        });
        }, function(){
          // this code runs when everything is 100% done
          res.redirect('/articles/' + createdArticle.id);
      });

      // has timing issues
      // tags.forEach(function(t) {
      //   db.tag.findOrCreate({
      //     where: {name:t.trim()}
      //   }).spread(function(newTag, wasCreated){
      //     createdArticle.addTag(newTag);
      //   });
      // });
      // res.redirect('/articles/' + createdArticle.id);
    } else {
      res.redirect('/articles/' + createdArticle.id);
    }
  }).catch(function(err){
    console.log(err);
    res.render('error')
  })
}
else {
  res.redirect('/articles/new')
}
});


module.exports = router;
