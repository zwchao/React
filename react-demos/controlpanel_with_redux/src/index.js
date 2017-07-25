import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import Controlpanel from './views/Controlpanel';
import store from './Store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = {store}>
        <Controlpanel />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
