import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './index.css';
import App from './App';
//import WrappedNormalCreateArticle from './components/createArticle';
import ArticleContent from './components/checkArticle';
import List from './components/articleList';
import CreateArticle from './components/createArticle';
//import  WrappedNormalLoginForm from './components/signup';
//import CreateArticle from './components/createArticle'
import registerServiceWorker from './registerServiceWorker';



const Demo = () =>(
    <BrowserRouter>
    <div>
    <Route exact path = "/" component = {List} />
    <Route path = "/posts" component = {ArticleContent} />
    <Route path = "/posts/edit/" component = {CreateArticle} />
    </div>
   
</BrowserRouter>
)
   


ReactDOM.render(< Demo />, document.getElementById('root'));
registerServiceWorker();
