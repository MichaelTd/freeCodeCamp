
//Basic required imports for NodeJS
//  http://localhost:3333/dateValues/
//  http://localhost:3333/dateValues/1498259845
//  http://localhost:3333/dateValues/"June 24, 2017"
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

// Instantiate body-parser cors and express

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

// GET call to return JSON that formats natural and unix date

app.get("/dateValues/:dVal", function(req,res,next){
  // Set a var for our request parameters
  var dateVal = req.params.dVal;

  // date formating options

  var dateFormattingOptions = {
    year: "numeric",
    month: 'long',
    day: 'numeric'
  };

  // If no params passed
  if(isNaN(dateVal)){
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
    var unixDate = new Date(dateVal).getTime()/1000;
  }
  else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
  }

  res.json({unix:unixDate, natural:naturalDate});

  //console.log("URL works");

});

app.listen(3333,function(){
  console.log("Hey! It's working");
});
