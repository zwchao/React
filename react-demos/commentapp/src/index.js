import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommentApp from './components/CommentApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CommentApp />, document.getElementById('root'));
registerServiceWorker();
