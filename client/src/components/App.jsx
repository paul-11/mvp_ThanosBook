import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter
} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <HashRouter basename="/">
        <div>
          <div>
            <Route exact path="/" component={Login} />
          </div>
          <div>
            <Route path="/signup" component={Signup} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;