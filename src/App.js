import React from 'react';
import IssuesList from './components/IssuesList'
import IssueDetails from './components/IssueDetails'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import {Container} from 'react-bootstrap'
import RespList from './components/RespList';

function App() {
  return (
    <div className="App">
      <IssueDetails ownerName={"fool1280"} respName={"SPOJ"} issueNumber={"1"}/>
    </div>
  );
}

export default App;
