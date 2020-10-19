import React, {useState} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      confirmPassword: ""
    }
  }

  /// Validation for login, checks the state of email and password to confirm length > 0
  validateLogin = () => {
    // Add additional features for stricter validation
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  matchPasswords = () => {

  }

  submitLogin = (e) => {
    console.log(this);
    e.preventDefault();

    var signIn = {
      username : this.state.username,
      password : this.state.password
    }
    fetch("https://interviewprepapp.azurewebsites.net/api/Account/Login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify(signIn)
      }
    )
    .then(res => res.json())
    .then(result => {
      if(result.jwt) {
        localStorage.setItem('token', result.jwt);
        localStorage.setItem('role', result.role);
        this.props.history.push("/")
      }
    })
  }

  setUsername(name){
    this.setState((state) => {
      return {username : name};
    })
  }

  setPassword(password){
    this.setState((state) => {
      return {password : password};
    })
  }

  setConfirmPassword(password){
    this.setState((state) => {
      return {confirmPassword : password};
    })
  }

  render(){
      return(
        <div style={{padding: "60px 0"}}>
          <form onSubmit={this.submitLogin} style={{margin: "0 auto", maxWidth: "320px"}} >
            <FormGroup controlId="username" bsSize="large">
              <FormLabel>Username</FormLabel>
              <FormControl autoFocus value={this.state.username} onChange={e => this.setUsername(e.target.value)} />
              <div className="text-danger">{this.state.errors.name}</div>
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl value={this.state.password} onChange={e => this.setPassword(e.target.value)} type="password"
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl value={this.state.password} onChange={e => this.setPassword(e.target.value)} type="password"
              />
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateLogin() } type="submit">
              Login
            </Button>
          </form>
        </div>
      )
  }
}