import React from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';

// import 'bootstrap/dist/css/bootstrap.min.css';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #bdc3c7 10%, #2c3e50 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '3px 5px',
});

export default class Home extends React.Component{ 

  componentDidMount(){
    fetch('https://interviewprepapp.azurewebsites.net/api/ping', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      }
    });
  }

  render(){
    return (
      <div>
        <header className="text-center home-header">
          <h1 className="display-4">Welcome</h1>
        </header>
  
        <main className="text-center card home-body">
          <h3 className="display-6">Choose a type of question below</h3>
          <MyButton variant="contained" color='secondary'  to={{pathname:"/Questions", state: {questionType: "technical"}}} component={Link}>
            Technical
          </MyButton>
          <MyButton variant="contained" color='secondary'  to={{pathname:"/Questions", state: {questionType: "behavioral"}}} component={Link}>
            Behavioral
          </MyButton>
          <MyButton variant="contained" color='secondary' component={Link} to={{pathname:"/Questions", state: {questionType: "whiteboard"}}}>
            Whiteboard
          </MyButton>
          <MyButton variant="contained" color='secondary'  to={{pathname:"/Questions", state: {questionType: "traversals"}}} component={Link}>
            Traversals
          </MyButton>
          {/* </Link> */}
          {/* <a asp-page="/Questions/Technical" className="btn btn-dark">Technical</a>
          <a asp-page="/Questions/Behavioral" className="btn btn-dark">Behavioral</a>
          <a asp-page="/Questions/Whiteboard" className="btn btn-dark">Whiteboard</a>
          <a asp-page="/Questions/Traversals" className="btn btn-dark">Traversals</a> */}
          <h3 className="display-8">These are also available in the top left</h3>
        </main>
  
        <footer>
          <a href="https://www.linkedin.com/in/nicholas-j-ryan/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in fa-2x"></i></a>
          <div>Brought to you by Nicco Ryan<br />Contact on LinkedIn if you'd like to contribute questions</div>
          <a href="https://github.com/Niccoryan0" target="_blank" rel="noopener noreferrer"><i className="fab fa-github fa-2x"></i></a>
        </footer>
      </div>
    );
  }
}