var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require(path);
var sha1 = require('sha1');

var checkNotLogin = require('../middlewres/check').checkNotLogin;
var UserModel = require('../models/users');

//GET /signup 注册页 前端页面
router.get('/', checkNotLogin, function(req, res, next){
    res.send(req.flash());
});

//POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next){
    var data = req.body;
    console.log("signup", data);
    var name = data.name;
    var gender = data.gender;
    var bio = data.bio;
    var password = data.password;
    var repassword = data.repassword;

    //校验参数 前后端都要校验
    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('名字长度限制在 1-10 个字符');
        }
        if(['m', 'f', 'x'].indexOf(gender) === -1){
            throw new Error('性别限制在m f x');
        }
        if(!(bio.length >= 1 && bio.length <=30)){
            throw new Error('个人简介1-30字');
        }
        if(password.length <= 6){
            throw new Error('密码至少6个字符');
        }
        if(password !== repassword){
            throw new Error('两次输入密码不一致');
        }
    }catch(e){
        res.send({status: 'error',msg: e.message}) 
    }

    //加密
    password = sha1(password);

    //将数据写入数据库
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio
    }

    UserModel.create(user)
        .then(function(result){
            user = result.ops[0];
            delete user.password;
            req.session.user = user;

            res.send({status: 'success', msg:'注册成功'});
            res.redirect('/posts');
        })
        .catch(function(e){
            if(e.message.match('E11000 duplicate key')){
                res.send({status: 'error', msg: '该用户名已被占用'})
            }
            next(e);
        });
});

module.exports = router;