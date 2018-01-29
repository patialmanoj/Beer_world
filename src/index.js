
import 'babel-polyfill';
import React from 'react';
//import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router,browserHistory} from 'react-router';
import routes from './route';

import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


render(
    // <Provider store={store}>
    //     <Router history={browserHistory} routes={routes}/>
    // </Provider>,
    <Router history={browserHistory} routes={routes}/>,
     document.getElementById('app')
);

