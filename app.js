// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var url = require('url');
var routes = require('./routes.js');
var BASE_URL = "http://elff.in/";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res) {
  var queryData = url.parse(req.url, true).query;
  console.log("Got the request");
});


//API endpoint to add student to the students table
router.route('/getShortUrl')

// create a new short url (accessed at POST http://localhost:8080/api/getShortUrl)
.post(function(req, res) {
  routes.getShortUrl(req,handleResult)

  //Handle Response
  function handleResult(response){
    res.json({ shortUrl: BASE_URL + response});
  }

  // res.json({ message: 'Student created!' });
  //Logic to save the student to db

});

//API endpoint to add student to the students table
router.route('/redirect')

// create a new short url (accessed at POST http://localhost:8080/api/getShortUrl)
.post(function(req, res) {

  routes.redirect(req,handleResult)

  //Handle Response
  function handleResult(response,error){
    //console.log(response);
    //res.json({ longURL: response});
    if(response!=null){
      res.redirect(response);
    }
  }

  // res.json({ message: 'Student created!' });
  //Logic to save the student to db

});




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//Setup rotuing for app
app.use(express.static(__dirname + '/public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
