import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from './store';

import './index.css';

ReactDOM.render(
  <Provider>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
