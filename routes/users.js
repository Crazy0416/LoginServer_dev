var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var crypto = require('../modules/encrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var loginCheck = function(req, res, next){
    console.log('loginCheck ' , req.session && req.session.uid , req.session , req.session.uid)
    if(req.session && req.session.uid){

        res.status(406).send('이미 로그인되어있습니다.');

    }else {

        next();

    }

};

var uidCheck = function(req, res, next){

    var uid = req.body.uid;

    User.findOne({uid: uid}, function(err, user){

        if(!user){

            next();

        }else {

            res.status(403).json({
                'success': 0,
                'ERR': 'DB SAVE ERR',
                'MSG': 'already exists.'
            })

        }

    })

};

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
    res.send('login ok');

});

// passport???
router.post('/login', loginCheck,  function(req, res, next){

   var uid = req.body.uid;
   var password = req.body.password;

   User.findOne({'uid': uid}, 'email gender level password', function (err, user) {

       console.log('POST /login Find User : ' + user);
       if(err){

           console.log('POST /user/login ERR : ' + err);
           res.json({
               'success': 0,
               'ERR': 'DB FIND ERR'
           })

       }else{

           crypto.verifyPassword(password, user.password, function(err, check){

               if(check){

                   // 세션 저장
                   req.session.uid = uid; req.session.email = user.email;
                   req.session.gender = user.gender; req.session.level = user.level;
                   res.json({
                       'success': 1,
                       'MSG': 'login Ok'
                   })

               }else{

                   res.json({
                       'success': 0,
                       'ERR': 'WRONG PASSWORD'
                   })

               }

           })

       }
   })

});

router.post('/register', loginCheck, uidCheck, function(req, res, next){

    var uid = req.body.uid;
    var password = req.body.password;
    var email = req.body.email;
    var gender = req.body.gender;

    crypto.hashPassword(password, function(err, hash){

        if(err){

            console.log('POST /users/register ERR : ' + err);
            res.json({
                'success': 0,
                'ERR': 'PASSWORD HASH ERR'
            })

        } else {

            var registerUser = new User({
                uid: uid,
                password: hash,
                email: email,
                gender: gender,
                level: "unRank"
            });

            registerUser.save(function(err, user){

                if(err){

                    console.log('POST /users/register ERR : ' + err);
                    res.status(500).json({
                        'success': 0,
                        'ERR': 'DB SAVE ERR'
                    })

                }else {                     // 저장 완료

                    console.log('DB user SAVE: ' + user);
                    //  세션 저장
                    req.session.uid = user.uid; req.session.email = user.email;
                    req.session.gender = user.gender; req.session.level = user.level;

                    res.json({
                        'success': 1,
                        'MSG': 'user SAVE OK'
                    })

                }

            })

        }

    })

});

router.delete('/logout', function(req, res, next){

    req.session.destroy();
    res.json({
        'success': 1,
        'MSG': 'LOGOUT Ok'
    })

});

router.delete('/delete', function(req, res, next){

    var uid = req.body.uid;

    userDB

});

module.exports = router;
