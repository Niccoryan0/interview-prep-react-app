import React from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

// import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends React.Component{ 

  render(){
    return (
      <div>
        <header className="text-center home-header">
          <h1 className="display-4">Welcome</h1>
        </header>
  
        <main className="text-center card home-body">
          <h3 className="display-6">Choose a type of question below</h3>
          <Link to={{pathname:"/Questions", state: {questionType: "technical"}}} tabIndex="-1">
            <Button>
              Technical
            </Button>
          </Link>
          <Link to={{pathname:"/Questions", state: {questionType: "behavioral"}}}>            
            <Button>
              Behavioral
            </Button>
          </Link>
          <Link to={{pathname:"/Questions", state: {questionType: "whiteboard"}}}>            
            <Button>
              Whiteboard
            </Button>
          </Link>
          <Link to={{pathname:"/Questions", state: {questionType: "traversal"}}}>  
            <Button>
                Traversal
            </Button>
          </Link>
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