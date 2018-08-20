// require stuff
var express = require('express');


// declare variables
var app = express();

// set and use statments


//define routes
app.get('/', function(req, res){
  res.send('home page!');
});

// hey listen
app.listen(3000);
