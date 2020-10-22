import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      errorMessage: "",
      persistent: false
    }
  }
  // refresh(){
  //   location.reload();
  // }

  validateLogin = () => {
    // Add additional features for stricter validation
    return this.state.username.length > 0 && this.state.password.length > 0;
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
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Interview Prep</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "technical"}}}>Technical</Nav.Link>
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "behavioral"}}}>Behavioral</Nav.Link>
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "whiteboard"}}}>Whiteboard</Nav.Link>
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "traversals"}}}>Traversals</Nav.Link>
        </Nav>

        {localStorage.getItem('token') &&
          <Nav className="justify-content-end" style={{marginRight:"10px"}}>
            <Nav.Link activeClassName="navSelected" as={NavLink} to='/Quiz'>Take A Quiz</Nav.Link>
            <NavDropdown title="Dashboard" alignRight>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        }
        {!localStorage.getItem('token') &&
          <Nav className="justify-content-end" style={{marginRight:"10px"}}>
            <Nav.Link as={NavLink} to='/Login'>Login</Nav.Link>
            <Nav.Link as={NavLink} to='/Register'>Register</Nav.Link>
          </Nav>
        }
      </Navbar>
    )
  }
}