import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment} from '../actions';

export default class CommentInput extends Component{
    constructor(props){
        super(props);
        this.state = {
        username:props.username,
        content:''
     }
    }

    componentDidMount(){
        this.textarea.focus();
    }

    handelUsernameBlur(event){
        if(this.props.onBlur){
            this.props.onBlur(event.target.value);
        }
    }

    handelUsernameChange(event){
        this.setState({
            username:event.target.value
        })
    }

    handelContentChange(event){
        this.setState({
            content:event.target.value
        })
    }

    handelSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({
                username:this.state.username,
                content:this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({content:''});
    }

    render(){
        return(
             <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input type="text" 
                        onBlur = {this.handelUsernameBlur.bind(this)}
                        onChange = {this.handelUsernameChange.bind(this)}
                        value = {this.state.username}/>
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea 
                        ref = {(textarea) => this.textarea = textarea}
                        onChange = {this.handelContentChange.bind(this)}
                        value = {this.state.content} />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button
                    onClick = {this.handelSubmit.bind(this)}
                    >发布</button>
                </div>
            </div>
        )
    }


}