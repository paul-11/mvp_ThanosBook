import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import axios from 'axios';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isUsernameAvailable: null,
      validUsernameLength: null,
      isPasswordValid: null,
      iUA: null,
      vUL: null,
      iPV: null,
      isSignedUp: false
    }
    this.checkUsernameAvailability = this.checkUsernameAvailability.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.checkUsernameLength = this.checkUsernameLength.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.addUser = this.addUser.bind(this);
    this.onCreateEnter = this.onCreateEnter.bind(this);
  }

  checkUsernameAvailability() {
    axios.get(`/search/user/${this.state.username}`)
      .then((result) => {
        if (result.data.length === 1) {
          this.setState({
            isUsernameAvailable: false
          })
        } else {
          this.setState({
            isUsernameAvailable: true
          })
        }
      })
      .catch(err => console.log(err));
  }

  checkUsernameLength() {
    if (this.state.username.length < 4 || this.state.username.length > 20) {
      this.setState({
        validUsernameLength: false
      })
    } else {
      this.setState({
        validUsernameLength: true
      })
    }
  }

  checkPassword() {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(this.state.password)) {
      this.setState({
        isPasswordValid: true
      })
    } else {
      this.setState({
        isPasswordValid: false
      })
    }
  }
  addUser(){
    if(this.state.isUsernameAvailable === true &&
    this.state.validUsernameLength === true &&
    this.state.isPasswordValid === true){
      axios.post(`search/user/${this.state.username}`, {
        username: this.state.username,
        password: this.state.password
      })
      .catch(err=>console.log(err))
      this.setState({
        isSignedUp: true
      })
    }
    if(this.state.isUsernameAvailable === false){
      this.setState({
        iUA: false
      })
    }else{
      this.setState({
        iUA: true
      })
    }

    if(this.state.validUsernameLength === false){
      this.setState({
        vUL: false
      })
    }else{
      this.setState({
        vUL: true
      })
    }

    if(this.state.isPasswordValid === false){
      this.setState({
        iPV: false
      })
    }else{
      this.setState({
        iPV: true
      })
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

  renderUsernameTaken() {
    if (this.state.iUA === false) {
      return (
        <div className="login-error signup-username-taken">
          This username is already taken
        </div>
      )
    }
  }

  onCreateEnter(e){
    if(e.key === 'Enter'){
      this.addUser();
    }
  }

  renderUsernameLengthError() {
    if (this.state.vUL === false) {
      return (
        <div className="login-error signup-username-error">
          Your username should be between 4 to 20 characters long
        </div>
      )
    }
  }

  renderPasswordError() {
    if (this.state.iPV === false) {
      return (
        <div className="login-error signup-password-error">
          Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters
        </div>
      )
    }
  }

  render() {
    if (this.state.isSignedUp === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div className="welcome-banner-container">
          <div className="welcome-banner">
            Let's get started!
          </div>
        </div>
        <div className="form-wrapper">
          <form className="form-container">
            <div className="input-container">
              <div className="input-heading">
                Username
              </div>
              <div className="input-box-container">
                <input className="input-box" name="username" onChange={(e)=>{this.onUsernameChange(e); setTimeout(()=>this.checkUsernameAvailability()); setTimeout(()=>this.checkUsernameLength());}} onKeyPress={this.onCreateEnter}/>
              </div>
              {this.renderUsernameTaken()}
              {this.renderUsernameLengthError()}

              <div className="input-heading">
                Password
              </div>
              <div className="input-box-container">
                <input className="input-box" type="password" name="password" onChange={(e)=>{this.onPasswordChange(e); setTimeout(()=>this.checkPassword()); }} onKeyPress={this.onCreateEnter}/>
              </div>
              {this.renderPasswordError()}
            </div>


            <div className="login-container">
              <div className="login-box" onClick={this.addUser}>
                Sign Up
              </div>
            </div>
            <div className="create-acc-container">
              <NavLink className="create-acc" to='/'>Back to login</NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
