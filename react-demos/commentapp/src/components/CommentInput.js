import React, {Component} from 'react';

class CommentInput extends Component{
    constructor(){
        super();
        this.state = {
            username:'',
            content:''
        }
    }

    handelUsernameChange(event){
        this.setState({username:event.target.value});

    }

    handelContentChange(event){
        this.setState({content: event.target.value});
    }
    
    handelSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({
                username:this.state.username,
                content:this.state.content,
                createdTime: +new Date()
            });
        }
        this.setState({content:''});
    }

    _saveUsername(username){
        localStorage.setItem('username',username);
    }

    _loadUsername(){
        const username = localStorage.getItem('username');
        if(username){
            this.setState({username});
        }
    }

    handelUsernameBlur(event){
        this._saveUsername(event.target.value);
    }

    componentDidMount(){
        this.textarea.focus();
    }

    componentWillMount(){
        this._loadUsername();
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

export default CommentInput;