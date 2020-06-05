import React from 'react';
import IssuesList from './components/IssuesList'
import IssueDetails from './components/IssueDetails'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap'
import RespList from './components/RespList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'




function App() {
  
  return (
    <Router>



      <NavBar></NavBar>
      <Switch>
        <Container>
          <Route exact path="/:owner/:repository" component={IssuesList}></Route>
          <Route exact path="/:repository" component={RespList}></Route>
          <IssuesList />
          <RespList></RespList>
          {/* <IssueDetails  ownerName={"fool1280"} respName={"SPOJ"} issueNumber={"1"}></IssueDetails> */}





        </Container>



      </Switch>
    </Router>
  );
}

export default App;
