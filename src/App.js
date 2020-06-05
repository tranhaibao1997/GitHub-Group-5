import React from 'react';
import IssuesList from './components/IssuesList'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import {Container} from 'react-bootstrap'
import RespList from './components/RespList';
import IssueDetails from './components/IssueDetails';

function App() {
  return (
    <div className="App">
      
      <NavBar></NavBar>
      <Container>
      {/* <IssueDetails  ownerName={"fool1280"} respName={"SPOJ"} issueNumber={"1"}></IssueDetails> */}
      <IssuesList />
      <RespList></RespList>
      </Container>
      
    </div>
  );
}

export default App;
