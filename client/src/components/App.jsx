import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter
} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './dashboard/Dashboard.jsx'
class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <Dashboard />
      )
    }
  }
  
  /*       <HashRouter basename="/">
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
      </HashRouter> */
export default App;