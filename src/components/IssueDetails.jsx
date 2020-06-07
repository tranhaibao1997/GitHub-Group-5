import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';

export default function IssueDetails({ match }) {
  let [issue, setIssue] = useState(null);
  let [comment, setComment] = useState(null);
  let [state, setState] = useState(null);
  let [users, setUser] = useState({});

  useEffect(() => {
    if (match) {
      getIssue(match.params.owner, match.params.repository, match.params.num);
      getComment(match.params.owner, match.params.repository, match.params.num);
    }
  }, []);

  const getIssue = async (ownerName, respName, issueNumber) => {
    try {
      let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues/${issueNumber}`;
      let data = await fetch(url);
      let result = await data.json();
      setIssue(result);
      setState(result.state);
      let temp = users;
      temp[result.user.id] = result.user.avatar_url;
      setUser(temp);
      console.log("Result", result);
    } catch (error) {   
      alert(error);
    }
  };

  const getComment = async (ownerName, respName, issueNumber) => {
    try {
      let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues/${issueNumber}/comments`;
      let data = await fetch(url);
      let result = await data.json();
      setComment(result);
      let temp = users;
      result.map((item) => {
          temp[item.user.id] = item.user.avatar_url;
          return;
      })
      setUser(temp);
      console.log("Comment", result);
    } catch (error) {
      alert(error);
    }
  };

  function capFirst(string) {
    
    let x = string;
    return x.charAt(0).toUpperCase() + x.slice(1);
  }

  function formatDate(string) {
    let temp = string.substring(0, 10).split("-");
    return temp[1] + "-" + temp[2] + "-" + temp[0];
  }

  if (!issue || !comment || !state) {
    return <div></div>;
  }

  return (
    <div>
      <Container style={{padding: "10px"}}>
        <Row className="border-bottom pb-3">
          <Col md="8">
            <h4>{issue.title} <span className="text-muted">#{issue.number}</span></h4>
              <div>
                <button className={issue.state === "closed" ? `btn btn-danger` : `btn btn-success`}> <i className="fas fa-times-circle"></i> {capFirst(state)}</button>
                  <p className="text-muted" style={{display: "inline", padding: "10px"}}>
                    <a className="text-muted" href={issue.user.url}>{issue.user.login}</a> opened this issue on {formatDate(issue.created_at)}
                  </p>
              </div>
          </Col>
          <Col>
            <div style={{float: "right"}}>
              <button className="btn btn-dark mr-2">Edit</button> 
              <button className="btn btn-success">New Issue</button>
            </div>
          </Col>
        </Row>
        <Row>
            <Col md={9}>
                <Row className="mt-3">
                    <Col md={2} className="flex-column align-items-center">
                        <img src={issue.user.avatar_url} style={{display: "block", margin: "0 auto", width: "80%"}}></img>
                        <p style={{fontSize: "100%", textAlign: "center"}}>{issue.user.login}</p>
                    </Col>
                    <Col md={10} style={{border: "1px solid grey", padding: "5px"}} >
                        <ReactMarkdown source={issue.body}></ReactMarkdown>
                    </Col>
                </Row>
                {comment.map((item) => {
                  return(
                    <div key={item.id}>
                      <Row className="mt-3">
                        <Col md={2}>
                          <img src={item.user.avatar_url} style={{display: "block", margin: "0 auto", width: "80%"}}></img>
                          <p style={{fontSize: "100%", textAlign: "center"}}>{item.user.login}</p>
                        </Col>
                        <Col md={10} style={{border: "1px solid grey", padding: "5px"}} >
                          <ReactMarkdown source={item.body}></ReactMarkdown>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
              </Col>
              <Col md={3}>
                <Row className="m-1 mt-3 border-bottom flex-column" style={{fontSize: "15px"}}>
                  <p>Assignees</p>
                    {issue.assignee ? ""
                    : (
                      <p  style={{color: "grey"}}>No one assigned</p>      
                    ) }
                </Row>
                <Row className="m-1 mt-3 border-bottom flex-column" style={{fontSize: "15px"}}>
                  <p>Projects</p>
                  <p style={{color: "grey"}}>None yet</p> 
                </Row>
                <Row className="m-1 mt-3 border-bottom flex-column" style={{fontSize: "15px"}}>
                  <p>Milestone</p>
                  <p style={{color: "grey"}}>No milestone</p> 
                </Row>
                <Row className="m-1 mt-3 border-bottom flex-column" style={{fontSize: "15px"}}>
                  <p>Linked pull requests</p>
                  <p style={{color: "grey"}}>Successfully merging a pull request may close this issue.</p> 
                  <p style={{color: "grey"}}>None yet.</p> 
                </Row>
                <Row className="m-1 mt-3 border-bottom flex-column" style={{fontSize: "15px"}}>
                  <div>
                  <p style={{fontWeight: "bold", float: "left"}}>Notifications</p>
                  <p style={{float: "right"}}>Customize</p>
                  </div>
                  <button className="btn btn-info"><i className="far fa-bell"></i> Subscribe</button>
                  <p style={{color: "grey"}}>You’re not receiving notifications from this thread.</p>
                </Row>
                <Row className="m-1 mt-3 border-bottom flex-column" style={{fontSize: "15px"}}>
                  {
                    Object.keys(users).length === 1 ? (
                      <p style={{color: "grey"}}>1 participant</p>
                    ) : (
                      <p style={{color: "grey"}}>{Object.keys(users).length} participants</p>
                    )
                  }
                </Row>
              </Col>
          </Row>
      </Container>
    </div>
  );
}
