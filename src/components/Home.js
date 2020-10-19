import React, { Link } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(props){ 
  return (
    <div>
      <header class="text-center home-header">
        <h1 class="display-4">Welcome</h1>
      </header>

      <main class="text-center card home-body">
        <h3 class="display-6">Choose a type of question below</h3>
        <Link to={{pathname:"/Questions", state: {questionType: "technical"}}}>Technical</Link>
        <Link to={{pathname:"/Questions", state: {questionType: "behavioral"}}}>Behavioral</Link>
        <Link to={{pathname:"/Questions", state: {questionType: "whiteboard"}}}>Whiteboard</Link>
        <Link to={{pathname:"/Questions", state: {questionType: "traversal"}}}>Traversal</Link>
        {/* <a asp-page="/Questions/Technical" class="btn btn-dark">Technical</a>
        <a asp-page="/Questions/Behavioral" class="btn btn-dark">Behavioral</a>
        <a asp-page="/Questions/Whiteboard" class="btn btn-dark">Whiteboard</a>
        <a asp-page="/Questions/Traversals" class="btn btn-dark">Traversals</a> */}
        <h3 class="display-8">These are also available in the top left</h3>
      </main>

      <footer>
        <a href="https://www.linkedin.com/in/nicholas-j-ryan/" target="_blank"><i class="fab fa-linkedin-in fa-2x"></i></a>
        <div>Brought to you by Nicco Ryan<br />Contact on LinkedIn if you'd like to contribute questions</div>
        <a href="https://github.com/Niccoryan0" target="_blank"><i class="fab fa-github fa-2x"></i></a>
      </footer>
    </div>
  );
}