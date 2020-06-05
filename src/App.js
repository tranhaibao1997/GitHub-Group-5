import React from 'react';
import IssuesList from './components/IssuesList'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import {Container} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Container>
      <IssuesList />
      </Container>
      
    </div>
  );
}

export default App;
