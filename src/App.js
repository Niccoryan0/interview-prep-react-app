import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

// import RenderQuestion from './components/RenderQuestion';


function App() {
  return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            {/* <Route path="/Questions" component={RenderQuestion}/> */}
            {/* <Route component={Error}/> */}
          </Switch>
        </div> 
      </BrowserRouter>
  );
}

export default App;
