import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter
} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Media from './media.jsx';

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
          <div>
            <Route path="/media" component={Media} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;