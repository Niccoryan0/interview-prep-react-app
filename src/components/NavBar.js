import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavItem, NavDropdown, Button } from 'react-bootstrap'
import ReactRouterBootstrap, { LinkContainer } from 'react-router-bootstrap';

import { AppBar, Typography, IconButton, Toolbar } from '@material-ui/core';


export default class NavBar extends React.Component{

  // refresh(){
  //   location.reload();
  // }

  render(){
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Interview Prep</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to={{pathname:"/Questions", state: {questionType: "technical"}}}>
            <NavItem>
              <Button>Technical
                </Button>
            </NavItem>
          </LinkContainer>
          <LinkContainer to={{pathname:"/Questions", state: {questionType: "behavioral"}}}><NavItem>Behavioral</NavItem></LinkContainer>
          <LinkContainer to={{pathname:"/Questions", state: {questionType: "whiteboard"}}}><NavItem>Whiteboard</NavItem></LinkContainer>
          <LinkContainer to={{pathname:"/Questions", state: {questionType: "traversals"}}}><NavItem>Traversals</NavItem></LinkContainer>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
      </Navbar>
    )
  }
}