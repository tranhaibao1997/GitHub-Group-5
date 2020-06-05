import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";

function NavBar(props) {
  let name = "";
  let { respName, ownerName, setIssueList } = React.useContext(StoreContext);
  function getInputChange(e) {
    name=e.target.value
    
  }
  const getIssueList = async (ownerName,respName) => {
    let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues?page=1&per_page=20`;
    let data = await fetch(url);
    let result = await data.json();
    console.log(result)

    setIssueList(result);
  };

  function keyPress(e) {
    
    if (e.keyCode == 13) {
        e.preventDefault();
        ownerName[1](name.split("/")[0])
        respName[1](name.split("/")[1])
        getIssueList(name.split("/")[0],name.split("/")[1])
    }
  }
  return (
    <div className="nav-bar">
      <Navbar variant="dark">
        <Navbar.Brand href="#home">
          <img id="logo" src="github-logo.svg"></img>
        </Navbar.Brand>
        <Form inline>
          <FormControl
            onChange={(e) => getInputChange(e)}
            onKeyDown={(e) => keyPress(e)}
            id="navbar-input"
            type="text"
            placeholder="Search or jump to..."
            className="mr-sm-4"
          />
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
