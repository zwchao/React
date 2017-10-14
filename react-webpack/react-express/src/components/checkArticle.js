import React from 'react';
import {Link} from 'react-router-dom';
import { Layout, Breadcrumb, Button } from 'antd';
const { Header, Content } = Layout;

class ArticleContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            article:{}
        }
    }


    loadArticleFromServer(article_id){
        const url = window.location;
        console.log(url);
      fetch(url,{
        method: 'GET',
        mode: "cors",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }).then(response =>{
        return response.json();
    }).then(obj =>{
        console.log('obj',obj);
        this.setState({article:obj});
        
    }).catch(error =>{
        console.error(error);
       this.setState({msg:error.msg});
    })

    }

    componentDidMount(){
      this.loadArticleFromServer();
    }

    

    render(){
        let url = '/posts/edit/'+ this.state.article._id ;
        return(
           
            <div className="article-contanier">
            <Layout className="layout">
            <Header>
              <div className="logo">{this.state.article._id}</div>
              
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>{this.state.article.title}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.state.article.content}</div>
              <div className = "menu-left" style={{ background: '#fff', padding: 24}}>
                <span className="createdTime"></span>
                <span className="tag right">
                    <span className="pvNumber">浏览{this.state.article.pv}</span>
                    <span className="commentCount">留言{this.state.commentCount}</span>
                </span>
              </div>
              <div className="menu-right">
              <Link to = {url}><Button type="primary" >编辑</Button></Link>
                <Button type="danger" >删除</Button>
              </div>
            </Content>
          </Layout>
            </div>
        )
    }
}

export default ArticleContent;