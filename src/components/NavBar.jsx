import React from "react";
import { Navbar, Nav, Form, FormControl,Dropdown,DropdownButton } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";
import { navigate } from "@reach/router"
import { Link } from 'react-router-dom'
import DropdownItem from "react-bootstrap/DropdownItem";

function NavBar(props) {
  let name = "";
  let { respName, ownerName, setIssueList, respList,user } = React.useContext(StoreContext);
  function getInputChange(e) {
    name = e.target.value

  }

  const getRespList = async (resp) => {
    let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/search/repositories?q=${resp}`
    let data = await fetch(url);
    let result = await data.json();
    console.log(result)
    respList[1](result.items)


  };
  console.log(respList[0], "daskdiashdjasdjhas")

  function keyPress(e) {

    if (e.keyCode === 13) {
      e.preventDefault();
      if (name.split("").includes("/")) {


        console.log("search có /")
        navigate(`/repos/${name.split("/")[0]}/${name.split("/")[0], name.split("/")[1]}/issues`);
        window.location.reload()
      }
      else {

        navigate(`/repositories/${name}`);
        window.location.reload()
      }

    }
  }
  if(user[0]===null)
  {
    return(<></>)
  }
  else
  {
    return (
      <div className="nav-bar ">
        <Navbar variant="dark justify-content-between" >
          <Navbar.Brand href="#home">
            <Link to="/"><img id="logo" src="/github-logo.svg" alt="github-logo"></img></Link>
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
          <div className="nav-user">
          <DropdownButton id="dropdown-basic-button" title={<img src={user[0].avatar_url}></img>}>
           
              <div className="sign-in-as">
                <span>
                  Signed in as
                </span>
                <span style={{fontWeight:"600"}}>
                  {user[0].login}
                </span>
              </div>
         
          <Dropdown.Item href="#/action-1">Your profile</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Your repositories</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Your projects</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Your stars</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Your gists</Dropdown.Item>  
        </DropdownButton>
          </div>
         
        </Navbar>
       
      </div>
    );
  }
  
}

export default NavBar;
