import React,{Component} from 'react';
import {connect} from 'react-redux';
import CommentList from '../components/CommentList';
import {initComments,deleteComment} from '../reducers/comment';

class CommentListContanier extends Component {

    componentWillMount(){
        this._loadComments();
    }

    _clearComments(){
        localStorage.clear();
    }

    _loadComments(){
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) :[]
        this.props.initComments(comments)
    }

    handleDeleteComment(index){
        const {comments} = this.props;
        const newComments = [
             ...comments.slice(0,index),
             ...comments.slice(index+1)
        ]
        localStorage.setItem('comments',JSON.stringify(newComments))
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }

    render(){
        return(
            <CommentList
            onDeleteComment = {this.handleDeleteComment.bind(this)} 
            comments = {this.props.comments}
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
        initComments:(comments) =>{
            dispatch(initComments(comments))
        },
        onDeleteComment:(commentIndex) =>{
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContanier)