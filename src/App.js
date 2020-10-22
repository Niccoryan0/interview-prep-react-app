import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Question from './components/Question';
import NavBar from './components/NavBar';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

import './App.css';


function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="/Questions" component={Question}/>
            <Route path="/Quiz" component={Quiz}/>

            {/* <Route component={Error}/> */}
          </Switch>
        </div> 
        <Footer />
      </BrowserRouter>
  );
}

export default App;
