import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isCredentialsCorrect: null
    }
    this.doesUsernameExist = this.doesUsernameExist.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginEnter = this.onLoginEnter.bind(this);
  }

  doesUsernameExist() {
    axios.post('/authenticate/password', {
      password: this.state.password,
      username: this.state.username
    })
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({
            isCredentialsCorrect: false
          })
        }else if(res.data.username === this.state.username && res.data.isValidPW === true){
          this.setState({
            isCredentialsCorrect: true
          })
        }else{
          this.setState({
            isCredentialsCorrect: false
          })
        }
      })
      .catch(err=>console.log(err));
  }

  onLoginEnter(e){
    if(e.key === 'Enter'){
      this.doesUsernameExist();
    }
  }

  onUsernameChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onPasswordChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderCredentialsError() {
    if (this.state.isCredentialsCorrect === false) {
      return (
        <div className="login-error">
          Invalid username or password
        </div>
      )
    }
  }

  render() {
    if (this.state.isCredentialsCorrect === true) {
      return <Redirect to={`/dashboard/${this.state.username}`}/>
    }

    return (
      <div className="login-body">
        <div className="welcome-banner-container">
          <div className="welcome-banner">
            Welcome to ThanosBook
          </div>
        </div>

        <div className="form-wrapper">
          <form className="form-container" >
            <div className="input-container">
              <div className="input-heading">
                Username
              </div>
              <div className="input-box-container">
                <input className="input-box" name="username" onChange={this.onUsernameChange} onKeyPress={this.onLoginEnter}/>
              </div>

              <div className="input-heading" >
                Password
              </div>
              <div className="input-box-container" >
                <input className="input-box" type="password" name="password" onChange={this.onPasswordChange} onKeyPress={this.onLoginEnter}/>
              </div>

              {this.renderCredentialsError()}
            </div>


            <div className="login-container">
              <div className="login-box" onClick={this.doesUsernameExist}>
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

