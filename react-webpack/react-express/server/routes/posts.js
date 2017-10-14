var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');


/*const articles = [
    {title:'1', content:'lalallalalalallalallall', id:'1'},
    {title:'2', content:'lalallalalalallalallall', id:'2'},
    {title:'3', content:'lalallalalalallalallall', id:'3'},
    {title:'4', content:'lalallalalalallalallall', id:'4'},
    {title:'5', content:'lalallalalalallalallall', id:'5'},
    {title:'6', content:'lalallalalalallalallall', id:'6'}
]*/



//GET /posts 所有用户或者特定用户的文章页
//  eg:GET /posts?author=xxx


//POST /posts 发表一篇文章
router.post('/',  function(req, res){
    var date = req.body;
    console.log(date);
    //var author = req.session.user._id;
    var title = date.title;
    var content = date.content;

    try{
        if(!title.length){
            throw new Error('请输入标题');
        }
        if(!content.length){
            throw new Error('请填写内容');
        }
    }catch(e){
        res.send({status:'error', msg: e.message});
    }

    var post = {
        //author: author,
        title: title,
        content: content,
        pv:0
    };

    PostModel.create(post)
        .then(function(result){
            post =  result.ops[0];
            res.send({status:'success', msg:'发表成功'});
        })
        .catch(function(e){
            res.send({status:'error', msg:'发布失败'});
        })
});

//GET /posts/ 文章列表页
router.get('/', function(req, res){
    Promise.all([
        PostModel.getPosts()
    ])
    .then(function(result){
        console.log(result[0]);
        res.send({status:'sucess', msg:'查询成功', data:result[0]});
    })
    .catch(function(e){
        res.send({status:'error', msg:'没有文章发表过'});
    })
})



//GET /posts/create 发表文章页
router.get('/create',  function(req, res, next){
    res.send(req.flash());
});

//GET /posts/:postId 单独一篇文章
router.get('/:postId',  function(req, res){
    var postId = req.params.postId;
    console.log(postId);//这里有个坑id前的:得去掉

    Promise.all([
        PostModel.getPostById(postId),// 获取文章信息
        PostModel.incPv(postId)// pv 加 1
      ])
    .then(function (result){
        var post = result[0];
        if(!post){
            throw new Error({status:'error', msg:'该文章不存在'})
        }

        res.send(post);
    })
});

//GET /posts/:postId/edit 更新文章页
router.get('/edit/:postId',  function(req, res){
   var postId = req.params.postId;
   console.log(postId);
   
   Promise.all([
       PostModel.getPostById(postId),
   ]).then(function(result){
       var post = result[0];
       if(!post){
           throw new Error({status:'error', msg:'文章不存在'})
       }

       res.send(post);
   })
})

//POST /posts/:postId/edit 更新一篇文章
router.post('/edit/:postId',  function(req, res){
    var postId = req.params.pathname;
    var data = req.body;
    console.log(data);
    var title = data.title;
    var content = data.content;

    Promise.all([
        PostModel.updatePostById(postId, {title: title, content: content})
    ]).then(function(){
        res.send({status:'success', msg:'更改成功'})
    }).catch(function(){
        res.send({status:'error',msg:'更改失败'})
    })
})

//GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove',  function(req, res, next){
    req.send(req.flash());
});

//POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment',  function(req, res, next){
    res.send(req.flash());
});

//GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/commentId/remove',  function(req, res, next){
    
});

module.exports = router
