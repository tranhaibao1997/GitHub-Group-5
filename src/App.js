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





function App() {
 

  return (
    <>
    <Authorize></Authorize>
    <Router>
      
      <NavBar></NavBar>
      <Switch>
        <Container>
          <Route exact path={"/repos/:owner/:repository/issues"} component={IssuesList}></Route>
          <Route exact path={"/repos/:owner/:repository/issues/:num"} component={IssueDetails}></Route>
          <Route exact path={"/repositories/:repository"} component={RespList}></Route>
          <Route exact path={"/"} component={Profile}></Route>
        </Container>



      </Switch>
    </Router>
    </>
  );
}

export default App;
