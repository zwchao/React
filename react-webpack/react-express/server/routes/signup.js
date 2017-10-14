var express = require('express');
var router = express.Router();
var sha1 = require('sha1');


var UserModel = require('../models/users');

//GET /signup 注册页 前端页面


//POST /signup 用户注册
router.post('/', function(req, res){
    var data =req.body;

    console.log("signup", data);
    
    var name = data.name;
    var password = data.password;
    var repassword = data.conform;

    //校验参数 前后端都要校验
    try{
        if(!(name.length > 1 && name.length <= 10)){
            throw new Error('名字长度限制在 1-10 个字符');
        }
        if(password.length < 6){
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
    }

    UserModel.create(user)
        .then(function(result){
            console.log(result);
            user = result.ops[0];
            delete user.password;
            req.session.user = user;

            res.send({status: 'success', msg:'注册成功', data: data});
        })
        .catch(function(e){
           
                res.send({status: 'error', msg: '该用户名已被占用'})
            
        });
});

module.exports = router;