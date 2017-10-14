import React from 'react';
import { Form,Input,Button} from 'antd';
const FormItem = Form.Item;
const {TextArea} = Input;

class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    loadCommentsFromServer(){
        const url = '/comment/'+this.props.id;
        fetch(url,{
            method: 'GET',
            mode: "cors",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response =>{
            return response.json();
        }).then(obj =>{
            console.log('obj',obj);
            //获取comments数据
        }).catch(error =>{
            console.error(error);
           
        })
    }


    componentDidMount(){
        this.loadCommentsFromServer();
    }

    
    render(){
        return(
            <div className="commentBox">
            <h3>留言区</h3>
            <CommentList data = {this.state.data}></CommentList>
            <CommentForm onCommentSubmit = {this.handleCommentSubmit.bind(this)} articleId = {this.props.id}></CommentForm>
            </div>
        )
    }
}

class Comment extends React.Component{
    render(){
        return(
            <div className="comment">
            <p className="comment-text">{this.props.text}</p>
            <span>评论人：</span><h4 className="comment author">{this.props.author}</h4>
            </div>
        )
    }
}

class CommentList extends React.Component{
    render(){
        let commentList = this.props.data.map(function(comment){
            return <Comment author = {comment.author} text = {comment.text} ></Comment>
        })
        return(
            <div className="comment-list">
            {commentList}
            </div>
        )
    }
}

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            author:''
        }
    }
    loadCommentAuthor(){

        fetch("http://127.0.0.1:5000/comment",{
            method: 'GET',
            mode: "cors",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response =>{
            return response.json();
        }).then(obj =>{
            console.log('obj',obj);
            //获取res.send里的user信息;
            
        }).catch(error =>{
            console.error(error);
        })

    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('received values of form:', values);
                this.props.onCommentSubmit({articleId:this.props.articleId, author:this.state.author, content: values.content})
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form className="create-comment" onSubmit = {this.handleSubmit.bind(this)}>
                <FormItem>
                {
                    getFieldDecorator('content',{
                        rules: [{required: true, message: '请输入评论内容'}],
                    })(<TextArea rows={10} />)
                }
               </FormItem>
    
               <FormItem>
                <Button type = "primary" htmlType = "submit" className = "comment-form-button">发表</Button>
           　　</FormItem>   
            </Form>
            
        )
    }
}

export default CommentBox;