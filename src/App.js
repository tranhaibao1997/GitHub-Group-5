import React from 'react';
import IssuesList from './components/IssuesList'
import IssueDetails from './components/IssueDetails'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap'
import RespList from './components/RespList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Authorize from './components/Authorize';
import Axios from 'axios';
import Profile from './components/Profile';
import CreateNewIssue from './components/CreateNewIssue';
import { StoreContext } from './ThemeContext'
import User from './components/User'





function App() {
  React.useEffect(() => {
    getUser()
  }, [])
  let { authUser } = React.useContext(StoreContext);
  async function getUser() {
    // const issue = { title: "testing", body: "This is a test issue" };
    const url = `https://api.github.com/user`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${localStorage.token}`,
      },
    });
    const data = await response.json();
    authUser[1](data);
  }

  return (
    <>

      <Router>
        <>

          <NavBar></NavBar>
          <Switch>
            <Container>
              <Route exact path={"/"} component={Profile}></Route>
              <Route exact path={"/repos/:owner/:repository/issues"} component={IssuesList}></Route>
              <Route exact path={"/repos/:owner/:repository/issues/new"} component={CreateNewIssue}></Route>
              <Route exact path={"/repos/:owner/:repository/issues/:num"} component={IssueDetails}></Route>
              <Route exact path={"/repositories/:repository"} component={RespList}></Route>
              <Route exact path={"/user/:username"} component={User}></Route>
            </Container>
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App;
