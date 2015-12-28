// var redis = require('redis');
// var redisClient = redis.createClient();
var client;
var LENGTH = 6;

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    client = require("redis").createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
    console.log('using cloud');
} else {
    client = require("redis").createClient();
    console.log('Connected to redis localhost!');
}

exports.redirect = function(req, callback) {
  console.log("Got redirect request!");
  console.log(req.originalUrl);
  var shortURL = req.body.shortURL;
  var length = shortURL.length;
  var hash = shortURL.substring(length-6,length);

  client.get(hash, function(err, reply) {
    // reply is null when the key is missing
    if(reply == null){

    }
    else{
      callback(reply);
    }
  });

}



exports.getShortUrl = function(req, callback) {
  console.log("Got getShortUrl request!");
  var longURL = req.body.longURL;
  var shortId = generateShortId(longURL);
  client.get(shortId, function(err, reply) {
    // reply is null when the key is missing
    if(reply == null){

      client.set(shortId,longURL,function(err,res){
        console.log("Saved new value in redis");
        callback(shortId);
      });
    }
    else{
      getShortUrl();
    }
});
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
