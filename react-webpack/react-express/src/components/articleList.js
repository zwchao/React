import React from 'react';
import {Link} from 'react-router-dom';


class ArticleTitle extends React.Component{
    render(){
        let url = "/posts/" + this.props.alt._id
        return(
    
            <div className="article-title">
                <h4>{this.props.alt.title}</h4><span>{this.props.alt._id}</span>
                <p>{this.props.alt.content}</p>
                <Link to = {
                  url
               }>详情请点击</Link>
            </div>
        )
    }
}

class TitleLists extends React.Component{
    render() {
        let titleNodes = this.props.articles.map(function(article,i){
            return <ArticleTitle alt = {article} key = {i} />;

        });
        return(
            <div className="titleLists">
                {titleNodes}
            </div>
        )
    }
}

class Lists extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            articles : [
                {title:'1',content:'222222'}
            ]
        }

    }
    

    loadAllArticlesFromServer(){
        fetch("http://127.0.0.1:5000/posts",{
            method: 'GET',
            mode: "cors",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then(response =>{
            return response.json();
        }).then(obj =>{
            console.log('obj',obj);
           this.setState({articles:obj.data})
            
        }).catch(error =>{
            console.error(error);
          
        })
    }
    componentDidMount(){
        this.loadAllArticlesFromServer();
    }

    render(){
        return(
            <div>
                <h2>文章列表</h2>
                <TitleLists articles = {this.state.articles} />
            </div>
        )
    }
}


export default Lists;