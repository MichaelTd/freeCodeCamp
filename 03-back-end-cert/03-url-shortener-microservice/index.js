// http://localhost:6660/
// Setup requirements

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require("models/shortUrl");
app.use(bodyParser.json());

app.use(cors());

// DB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');

// Expose public static files
app.use(express.static(__dirname + '/public'));

// Get app params
app.get('/new/:urlToShorten(*)',function(req, res, next){

  //var urlToShorten = req.params.urlToShorten
  var {urlToshorten} = req.params;

  // url re check
  //var re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  //I think this is simple and efficient /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

  //_^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS

  var re = /^(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi;

  if (re.test(urlToShorten)===true){
    var short = Math.floor(Math.randowm()*100000).toString();

    var data = new shortUrl({

      originalUrl: urlToShoten,
      shorterUrl: short

    });

    data.save(err=>{
      if (err) return res.send('Error saving to database');
    });

    return res.json({data.sort});

  }

  return res.json({urlToShorten: 'Failed'});

});










// Check app pulse ;..;
// ES6 anonymous function convention : ()=>{}
// process.env.PORT is for Heroku
app.listen(process.env.PORT || 6660, function(){

  console.log('IT\'S ALIIIVEEEE IT\'S ALIIIIIVE!!!');

});
