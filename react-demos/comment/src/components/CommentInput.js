import React,{Component} from 'react';

export default class CommentInput extends Component{
    constructor(props){
        super(props);
        this.state={
            username:props.username,
            content:''
        }
        
    }

    componentDidMount(){
        this.textarea.focus();
    }

    handleUsernameChange(event){
        this.setState({username:event.target.value})
    }

    handleUsernameBlur(event){
        if(this.props.onUsernameBlur){
            this.props.onUsernameBlur(event.target.value)
        }
    }

    handleContentChange(event){
        this.setState({content:event.target.value})
    }

    handleClick(){
        if(this.props.onhandleSubmit){
            this.props.onhandleSubmit({
                username:this.state.username,
                content:this.state.content,
                createTime: +new Date()
            })
        }

        this.setState({content:''})
    }

    render(){
        return(
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <input type="text" 
                    value = {this.state.username}
                    onChange = {this.handleUsernameChange.bind(this)}
                    onBlur = {this.handleUsernameBlur.bind(this)}
                    className=""/>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                        ref = {(textarea) =>this.textarea = textarea}
                        value = {this.state.content}
                        onChange = {this.handleContentChange.bind(this)}
                         />
                    </div>
                </div>
                <div className="comment-field-button">
                <button 
                onClick = {this.handleClick.bind(this)}
                >发布</button>
                </div>
            </div>
        )
    }
}