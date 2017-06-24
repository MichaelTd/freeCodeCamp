// http://localhost:6660/
// Setup requirements

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use(cors());

// Expose public static files
app.use(express.static(__dirname + '/public'));

// Get app params
app.get('/new/:urlToShorten(*)',function(req, res, next){

  var urlToShorten = req.params.urlToShorten
  // ES6 version: var {urlToshorten} = req.params;


});










// Check app pulse ;..;
// ES6 anonymous function convention : ()=>{}
// process.env.PORT is for Heroku
app.listen(process.env.PORT || 6660, function(){

  console.log('IT\'S ALIIIVEEEE IT\'S ALIIIIIVE!!!');

});
