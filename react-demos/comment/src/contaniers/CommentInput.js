import React,{Component} from 'react';
import {connect} from 'react-redux';
import CommentInput from '../components/CommentInput';
import {addComment} from '../reducers/comment';

class CommentInputContainer extends Component{
    constructor(){
        super();
        this.state = {
            username:''
        }
    }

    componentWillMount(){
        this._loadUsername()
    }

    _loadUsername(){
        const username = localStorage.getItem('username');
        if(username){
            this.setState({username:username})
        }
    }

    _saveUsername(username){
        localStorage.setItem('username',username)
    }

    hadleSubmitComment(comment){
        if(!comment) return
        if(!comment.username) return alert('输入用户名')
        if(!comment.content) return alert('评论不能为空')

        const {comments} = this.props;
        const newComments = [...comments,comment]

        localStorage.setItem('comments',JSON.stringify(newComments))//往本地存新添加的comment

        if(this.props.onSubmit){  //利用this.props.onSubmit来触发一个dispatch来更新state里的comments
            this.props.onSubmit(comment)
        }


    }



    render(){
        return(
            <CommentInput 
            username = {this.state.username}
            onhandleSubmit = {this.hadleSubmitComment.bind(this)}
            onUsernameBlur = {this._saveUsername.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        comments:state.comments
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onSubmit:(comment) =>{
            dispatch(addComment(comment))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)