var Post = require('../lib/mongo').Post;


Post.plugin('contentToHtml',{
    afterFind: function(posts){
        return posts.map(function(post){
           
            return post;
        });
    },
    afterFindOne: function(post){
        if(post){
           
        }
        return post;
    }
});

module.exports = {
    //创建一篇文章
    create: function create(post){
        return Post.create(post).exec()
    },
    getPostById: function getPostById(postId) {
       
        return Post
          .findOne({ _id: postId })
          //.populate({ path: 'author', model: 'User' })
          .addCreatedAt()
          //.contentToHtml()
          .exec();
      },
    //根据时间降序获取文章
    getPosts: function getPost(author){
        var query = {};
        if(author){
            query.author = author;
        }
        return Post
            .find()
            .populate({path: 'author', model:'User'})
            .sort({_id: -1})
            .contentToHtml()
            .exec();
    },

    //编辑更新一篇文章
    updatePostById: function updatePostById(postId,data){
        return Post.update({ _id: postId},{ $set: data }).exec();
    },

    //浏览次数
    incPv: function incPv(postId){
        return Post
            .update({_id: postId},{$inc: {pv: 1}})
            .exec();
    }
};