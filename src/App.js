import React from 'react';
import IssuesList from './components/IssuesList'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import {Container} from 'react-bootstrap'
import RespList from './components/RespList';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Container>
<<<<<<< HEAD
        <IssuesList/>
        <IssueDetails ownerName={"fool1280"} respName={"SPOJ"} issueNumber={"1"}/>
        <RespList></RespList>
=======
      <IssuesList />
      <RespList></RespList>
      </Container>
      
>>>>>>> a74f3895d97565b9a3ae313b342bed9c9b9602fe
    </div>
  );
}

export default App;
