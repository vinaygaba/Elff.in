var redis = require('redis');
var redisClient = redis.createClient(port, host);

var LENGTH = 6;

exports.redirect = function(req, callback) {

  console.log("Got redirect request!");
  callback("Handle Response");

  //var id =

}



exports.getShortUrl = function(req, callback) {
  console.log("Got getShortUrl request!");
  var longURL = req.body.longURL;
  var shortId = generateShortId(longURL);

  redisClient.on('connect', function() {
    console.log('connected');
  });
  //console.log(shortId);
  callback(shortId);

}

var generateShortId = function(longURL) {
    //logic to generate short id
    var shortID = "";
    // Map to store 62 possible characters
    var map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < LENGTH; i++) {
        shortID += map.charAt(Math.floor(Math.random() * map.length));
    }

    return shortID;
};
