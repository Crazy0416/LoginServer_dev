var redis = require('redis');
var redisConfig = require('../config/session_config.json');

var redisClient = redis.createClient(6379, "localhost");

redisClient.auth(redisConfig.password, function(err){

    if (err)    throw err;

});

redisClient.on('error', function(err){

    console.log('Redis error : '  + err);

});

module.exports = redisClient;