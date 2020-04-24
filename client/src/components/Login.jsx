import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap'
// const Login = () => (
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
  }

  doesUsernameExist() {
    axios.get(`/search/user/${this.state.username}`)
      .then((res) => {
        if(res.data[0] === undefined){
          this.setState({
            isCredentialsCorrect: false
          })
        }else if (res.data[0].username === this.state.username && res.data[0].password === this.state.password) {
          this.setState({
            isCredentialsCorrect: true
          })
        } else {
          this.setState({
            isCredentialsCorrect: false,
          })
        }
      })
      .catch(err => console.log(err))
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
    if(this.state.isCredentialsCorrect === false){
      return (
        <div className="login-error">
          Invalid username or password
        </div>
      )
    }
  }

  render() {
    if (this.state.isCredentialsCorrect === true) {
      return <Redirect to='/signup' />
      //change the '/signup' endpoint to the profile page endpoint.
      //right now it's just redirecting you back to the sign up page if the login credentials are correct
    }

    return (
      <>
      <div>
        <div className="welcome-banner-container">
          <div className="welcome-banner">
            Welcome to ThanosBook!!!!!!!!
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
                <Button className="login-box">
                  Login
                </Button>
              </div>
              <div className="create-acc-container">
                  <NavLink className="create-acc" to='/signup'>Create an account</NavLink>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

