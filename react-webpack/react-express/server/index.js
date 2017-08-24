var express = require('express');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package.json');
var app = express();

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//session 中间件
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}));

//flash 中间件，用来显示通知
app.use(flash());

//路由
routes(app);

//启动应用

app.listen(config.port, function(){
  console.log(`${pkg.name} listening on port ${config.port}`);
});