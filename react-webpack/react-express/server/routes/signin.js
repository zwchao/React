var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var UserModel = require('../models/users');
var checkNotLogin = require('../middlewres/check').checkNotLogin;

//GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next){
    res.send(req.flash());
});

//POST /signin 用户登录
router.post('/',  function(req, res){
    console.log(req.body);
   var name = req.body.name;
   var password = req.body.password;

   UserModel.getUserByName(name)
    .then(function(user){
        if(!user){
            res.send({status:'error',msg:'用户不存在'});
        }

        if(sha1(password) !== user.password){
            res.send({status:'error',msg:'用户名或密码错误'});
        }

        res.send({status:'success',msg:'登录成功'});
        delete user.password;
        req.session.user = user;
    })
    .catch();
});

module.exports = router;