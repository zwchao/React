class CommentListContainer extends Component{
    componentWillMount(){
        this._loadComments();
    }

    _loadComments(){
        let comments = localStorage.getItem('comments');
        comments = comments? JSON.stringify(comments):[];
        this.props.initComments(comments);
    }

    handleDeleteComment(index){
        const {comments} = this.props;
        const newComments = [
            ...comments.slice(0,index),
            ...comments.slice(index+1)
        ]

        localStorage.setItem('comment',JSON.stringify(newComments));
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index);
        }
    }

    render(){
        return(
            <CommentList 
            comments = {this.props.comments}
            onDeleteComment = {this.onDeleteComment.bind(this)}
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
        initComments: (comments) =>{
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex) =>{
            dispatch(deleteComment(commentIndex))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)