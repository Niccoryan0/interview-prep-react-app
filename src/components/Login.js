import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      errorMessage: "",
      persistent: false
    }
  }

  /// Validation for login, checks the state of email and password to confirm length > 0
  validateLogin = () => {
    // Add additional features for stricter validation
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  submitLogin = (e) => {
    console.log(this);
    e.preventDefault();

    var signIn = {
      username : this.state.username,
      password : this.state.password,
      persistent : this.state.persistent
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
      }else{
        this.setState((state) => {
          return {errorMessage : "Invalid username or password"};
        })
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

  setPersistence(persistence){
    this.setState((state) => {
      return {persistent : persistence};
    })
  }

  render(){
    const classes = this.props;

      return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitLogin(e)} noValidate>
            <div>{this.state.errorMessage}</div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={e => this.setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e => this.setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" onChange={e => this.setPersistence(e.target.checked)} color="primary" checked={this.state.persistent} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      )
  }
}

export default withStyles(styles)(Login);