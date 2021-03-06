// var redis = require('redis');
// var redisClient = redis.createClient();
var client;
var LENGTH = 5;

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
  // var shortURL = req.body.shortURL;
  // var length = shortURL.length;
  // var hash = shortURL.substring(length-6,length);
  var hash = req.params.shortURL;

  client.get(hash, function(err, reply) {
    // reply is null when the key is missing
    if(err){
      console.log(err);
    }else{
      if(reply == null){

      }
      else{
        callback(reply);
      }
    }
  });

}



exports.getShortUrl = function(req, callback) {
  console.log("Got getShortUrl request!");
  var longURL = req.body.longURL;
  console.log("Long URL IS " + longURL);
  var shortId = generateShortId(longURL);
  client.get(shortId, function(err, reply) {
    // reply is null when the key is missing
    if(err){

    }else{
    if(reply == null){

      client.set(shortId,longURL,function(err,res){
        if(err){
          console.log(err);
        } else{
        console.log("Saved new value in redis");
        callback(shortId);
      }
      });
    }
    else{
      getShortUrl();
    }
  }
});
}


exports.getCustomURL = function(req,callback){

  var shortURL = req.body.shortURL;
  var longURL = req.body.longURL;

  client.get(shortURL, function(err, reply) {

    if(err){

    } else{
        if(reply==null){
          client.set(shortURL,longURL,function(err,res){
            if(err){
              console.log(err);
            }
            else{
            console.log("Saved new value in redis");
            callback(shortURL);
            }
          });
        }else{
          //reply not null
          callback("URL already exists");
        }
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
