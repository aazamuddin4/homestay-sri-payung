import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Analytics } from "@vercel/analytics/react";
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <Analytics />
    </React.StrictMode>,
    document.getElementById('root')
);
