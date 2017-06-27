// Requirements
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const bing = require('node-bing-api')(accKey: 'db63791f74064c3ca3a65570902162f5');

const searchTerm = require('models/searchTerm');

app.use(bodyParser);
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/searchTerms');

// get call with required and not required params to do a search for an image

app.get('/api/imagesearch/:searchVal*',(req, res, next)=>{
  var {searchVal} = req.params;
  var {offset} = req.query;

  var data = new searchTerm({
    searchVal: searchVal,
    searchDate: new Date()

  });

  data.save(err =>{
    if (err) {
      res.send('Error saving to db');
    }
    res.json(data);
  });

  //return res.json({searchVal, offset});

});


app.listen(process.env.PORT || 6666, ()=>{
  console.log('Server is Running');
});
