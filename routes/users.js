var express = require('express');
var router = express.Router();
//var userDB = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');

});

router.post('/login', function(req, res, next){

   var uid = req.body.uid;
   var password = req.body.password;

   userDB

});

router.post('/register', function(req, res, next){

    var uid = req.body.uid;
    var password = req.body.password;

    userDB

});

router.delete('/delete', function(req, res, next){

    var uid = req.body.uid;

    userDB

});

module.exports = router;
