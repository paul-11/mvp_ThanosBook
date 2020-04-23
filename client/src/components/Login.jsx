import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

// const Login = () => (
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  componentDidMount(){
    axios.get(`/search/user/${this.state.username}`)
    .then((result)=>{
      console.log(result)
      this.setState({
        storage: result.data
      })
    })
    .catch(err=>console.log(err));
  }

  render() {
    return (
      <div>
        <div className="welcome-banner-container">
          <div className="welcome-banner">
            Welcome to App!!!!!!!!
        </div>
        </div>

        <div className="form-wrapper">
          <form className="form-container" >
            <div className="input-container">
              <div className="input-heading">
                Username
                 </div>
              <div className="input-box-container">
                <input className="input-box" />
              </div>

              <div className="input-heading">
                Password
                 </div>
              <div className="input-box-container">
                <input className="input-box" />
              </div>

              <div className="login-error">
                Invalid username or password
                   </div>
            </div>


            <div className="login-container">
              <div className="login-box">
                Login
              </div>
            </div>
            <div className="create-acc-container">
                <NavLink className="create-acc" to='/signup'>Create an account</NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
// )

