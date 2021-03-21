import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './static/index.css';
import reportWebVitals from './reportWebVitals';
import Config from './Config';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App config={new Config()} />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();