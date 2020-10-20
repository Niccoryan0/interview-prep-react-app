import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { IndexLinkContainer } from 'react-router-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default class NavBar extends React.Component{

  // refresh(){
  //   location.reload();
  // }

  render(){
    
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Interview Prep</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "technical"}}}>Technical</Nav.Link>
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "behavioral"}}}>Behavioral</Nav.Link>
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "whiteboard"}}}>Whiteboard</Nav.Link>
          <Nav.Link activeClassName="navSelected" as={NavLink} to={{pathname:"/Questions", key: uuidv4(), state: {questionType: "traversals"}}}>Traversals</Nav.Link>
          <NavDropdown>

          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}