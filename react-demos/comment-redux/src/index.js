import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CommentApp from './CommentApp';
import Store from './Store';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Provider store = {store}>
    <CommentApp />
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
