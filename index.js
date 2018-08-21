// require stuff
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');


// declare variables
var app = express();

// set and use statments
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

// include controllers/routers
app.use('/articles', require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));
app.use('/comments', require('./controllers/comments'))


//define routes
app.get('/', function(req, res){
  res.render('home');
});

app.get('*', function(req, res){
  res.render('error');
});

// hey listen
app.listen(3000);
