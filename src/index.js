import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, withRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducer from './reducer'
import registerServiceWorker from './registerServiceWorker'

// const store = createStore(reducer)

ReactDOM.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>,

document.getElementById('root'));
registerServiceWorker();
