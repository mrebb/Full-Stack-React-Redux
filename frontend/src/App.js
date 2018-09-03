import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import store from './store/index';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  } 
}

export default App;
