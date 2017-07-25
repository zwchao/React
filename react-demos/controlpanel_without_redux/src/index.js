import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Contropanel from './views/Controlpanel';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Contropanel />, document.getElementById('root'));
registerServiceWorker();
