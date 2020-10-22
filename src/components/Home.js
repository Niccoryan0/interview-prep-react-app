import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
import FancyButton from './FancyButton'

// import 'bootstrap/dist/css/bootstrap.min.css';


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
            <FancyButton variant="contained" color='secondary'  to={{pathname:"/Questions", state: {questionType: "technical"}}} component={Link}>
              Technical
            </FancyButton>
            <FancyButton variant="contained" color='secondary'  to={{pathname:"/Questions", state: {questionType: "behavioral"}}} component={Link}>
              Behavioral
            </FancyButton>
            <FancyButton variant="contained" color='secondary' component={Link} to={{pathname:"/Questions", state: {questionType: "whiteboard"}}}>
              Whiteboard
            </FancyButton>
            <FancyButton variant="contained" color='secondary'  to={{pathname:"/Questions", state: {questionType: "traversals"}}} component={Link}>
              Traversals
            </FancyButton>
            {/* </Link> */}
            {/* <a asp-page="/Questions/Technical" className="btn btn-dark">Technical</a>
            <a asp-page="/Questions/Behavioral" className="btn btn-dark">Behavioral</a>
            <a asp-page="/Questions/Whiteboard" className="btn btn-dark">Whiteboard</a>
            <a asp-page="/Questions/Traversals" className="btn btn-dark">Traversals</a> */}
            <h3 className="display-8">These are also available in the top left</h3>
          </main>
      </div>
    );
  }
}