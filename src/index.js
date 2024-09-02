import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the use of 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // import your store configuration
import App from './App';
import './index.css';

// Create a root and render your application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
