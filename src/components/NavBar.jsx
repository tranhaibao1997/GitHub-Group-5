import React from "react";
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'

function NavBar(props) {
  return (
    <div className="nav-bar">
      <Navbar  variant="dark">
        <Navbar.Brand href="#home"><img id="logo" src="github-logo.svg"></img></Navbar.Brand>
        <Form inline>
          <FormControl id="navbar-input" type="text" placeholder="Search or jump to..." className="mr-sm-4" />
        </Form>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Pull requests</Nav.Link>
          <Nav.Link href="#features">Issues</Nav.Link>
          <Nav.Link href="#pricing">About</Nav.Link>
        </Nav>
        
      </Navbar>
    </div>
  );
}

export default NavBar;
