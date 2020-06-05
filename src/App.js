import React from 'react';
import IssuesList from './components/IssuesList'
import IssueDetails from './components/IssueDetails'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import {Container} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      {/*<NavBar></NavBar>
      <Container>
        <IssuesList/>
      </Container>*/}
      <IssueDetails ownerName={"fool1280"} respName={"SPOJ"} issueNumber={"1"}/>
    </div>
  );
}

export default App;
