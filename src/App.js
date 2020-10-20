import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Question from './components/Question';
import './App.css';


function App() {
  return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="/Questions" component={Question}/>
            {/* <Route component={Error}/> */}
          </Switch>
        </div> 
      </BrowserRouter>
  );
}

export default App;
