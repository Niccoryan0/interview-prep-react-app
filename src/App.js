import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/Home';
import Login from './components/Login';
import Question from './components/RenderQuestion';


function App() {
  return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login}/>
            <Route path="/Questions" component={Question}/>
            {/* <Route component={Error}/> */}
          </Switch>
        </div> 
      </BrowserRouter>
  );
}

export default App;
