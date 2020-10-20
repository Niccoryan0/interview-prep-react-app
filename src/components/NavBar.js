import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import { AppBar, Typography, IconButton, Toolbar } from '@material-ui/core';


export default class NavBar extends React.Component{
  render(){
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Interview Prep</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer href={{pathname:"/Questions", state: {questionType: "technical"}}}><NavItem>Technical</NavItem></LinkContainer>
          <LinkContainer href={{pathname:"/Questions", state: {questionType: "behavioral"}}}><NavItem>Behavioral</NavItem></LinkContainer>
          <LinkContainer href={{pathname:"/Questions", state: {questionType: "whiteboard"}}}><NavItem>Whiteboard</NavItem></LinkContainer>
          <LinkContainer href={{pathname:"/Questions", state: {questionType: "traversal"}}}><NavItem>Traversals</NavItem></LinkContainer>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
      </Navbar>
    )
  }
}