import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './static/index.css';
import reportWebVitals from './reportWebVitals';
import config from './config';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App config={config} />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();