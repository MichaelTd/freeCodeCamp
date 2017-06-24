// Basic required imports for NodeJS
// http://localhost:6660/api/whoami

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// Headers in nicely formated fields
var useragent = require('express-useragent');
// Create an instance of express for out app and instantiante body-parser - cors

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());

// API URL
//var api = '/api/whoami';

app.get('/api/whoami', function(req, res, next){

  // res.json(req.headers); for all haders


  var lang = req.acceptsLanguages();
  //var soft =  req.headers['user-agent']; Same way of getting data for software
  //var soft = req.get('User-Agent');
  var soft = req.useragent.browser + ", on " + req.useragent.os;
  var ipadd = req.ip;


  res.json({
    'ipaddress'   : ipadd,
    'language'    : lang[0],
    'software'    : soft
  })

});

// Check app pulse.
app.listen(6660,function(){
  console.log("Hey! It's working");
});
