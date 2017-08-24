var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewres/check').checkLogin;

//GET /signout 登出
router.get('/', checkLogin, function(req, res, next){
    res.send(req.flash());
});

module.exports = router;