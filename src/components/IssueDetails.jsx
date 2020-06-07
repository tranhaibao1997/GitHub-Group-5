import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { navigate } from "@reach/router";
import { StoreContext } from "./../ThemeContext";
import Moment from "react-moment";

export default function IssueDetails({ match }) {
  let [issue, setIssue] = useState(null);
  let [comment, setComment] = useState(null);
  let [state, setState] = useState(null);
  let [users, setUser] = useState(null);
  let [init, setInit] = useState(true);
  let [body, setBody] = React.useState("");

  let { authUser } = React.useContext(StoreContext);

  useEffect(() => {
    if (match) {
      getIssue(match.params.owner, match.params.repository, match.params.num);
      getComment(match.params.owner, match.params.repository, match.params.num);
    }
  }, []);

  useEffect(() => {
    if (issue && comment) {
      getUsers();
    }
  }, []);

  const getUsers = () => {
    let temp = {};
    temp[issue.user.id] = issue.user.avatar_url;
    comment.map((item) => {
      temp[item.user.id] = item.user.avatar_url;
      return;
    });
    setUser(temp);
    console.log("User:", temp);
  };

  const getIssue = async (ownerName, respName, issueNumber) => {
    try {
      let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues/${issueNumber}`;
      let data = await fetch(url);
      let result = await data.json();
      setIssue(result);
      setState(result.state);
      console.log("Result", result);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async (ownerName, respName, issueNumber) => {
    try {
      let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues/${issueNumber}/comments`;
      let data = await fetch(url);
      let result = await data.json();
      setComment(result);
      console.log("Comment", result);
    } catch (error) {
      console.log(error);
    }
  };

  function getBody(e) {
    setBody(e.target.value);
  }
  async function postAnComment(e) {
    e.preventDefault();

    try {
      const cmt = { body: `${body}` };
      const url = `https://api.github.com/repos/${match.params.owner}/${match.params.repository}/issues/${match.params.num}/comments`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${localStorage.token}`,
        },
        body: JSON.stringify(cmt),
      });

      getComment(match.params.owner, match.params.repository, match.params.num);
      navigate(
        `/repos/${match.params.owner}/${match.params.repository}/issues/${match.params.num}`
      );
      window.location.reload();
    } catch (err) {}
  }

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

  if (issue && comment && init) {
    getUsers();
    setInit(false);
  }

  console.log(issue, "this is issue detail");
  console.log(comment, "this is comment");

  return (
    <div>
      <Container style={{ padding: "10px" }}>
        <Row className="border-bottom pb-3">
          <Col md="8">
            <h4>
              {issue.title} <span className="text-muted">#{issue.number}</span>
            </h4>
            <div>
              <button
                className={
                  issue.state === "closed"
                    ? `btn btn-danger`
                    : `btn btn-success`
                }
              >
                {" "}
                <i className="fas fa-times-circle"></i> {capFirst(state)}
              </button>
              <p
                className="text-muted"
                style={{ display: "inline", padding: "10px" }}
              >
                <a className="text-muted" href={issue.user.url}>
                  {issue.user.login}
                </a>{" "}
                created this issue on {formatDate(issue.created_at)}
              </p>
            </div>
          </Col>
          <Col>
            <div style={{ float: "right" }}>
              {authUser[0] ?(authUser[0].login===issue.user.login ?<button className="btn btn-dark mr-2">Edit</button> :"") :""}
              <button className="btn btn-success">New Issue</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Row className="mt-3">
              <Col md={2} className="flex-column align-items-center">
                <img
                  src={issue.user.avatar_url}
                  style={{ display: "block", margin: "0 auto", width: "80%" }}
                ></img>
                <p style={{ fontSize: "100%", textAlign: "center" }}>
                  {issue.user.login}
                </p>
              </Col>
              <Col
                md={10}
                style={{ border: "1px solid #d1d5da", padding: "5px" }}
              >
                <div className="post-time">
                  <p>
                    <span style={{ fontWeight: 600 }}>{issue.user.login}</span>{" "}
                    created this issue <Moment fromNow>{issue.created_at}</Moment>
                  </p>
                </div>
                <ReactMarkdown source={issue.body}></ReactMarkdown>
              </Col>
            </Row>
            {comment.map((item) => {
              return (
                <div key={item.id}>
                  <Row className="mt-3">
                    <Col md={2}>
                      <img
                        src={item.user.avatar_url}
                        style={{
                          display: "block",
                          margin: "0 auto",
                          width: "80%",
                        }}
                      ></img>
                      <p style={{ fontSize: "100%", textAlign: "center" }}>
                        {item.user.login}
                      </p>
                    </Col>
                    <Col
                      md={10}
                      style={{ border: "1px solid #d1d5da", padding: "5px" }}
                    >
                      <div className="post-time">
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            {item.user.login}
                          </span>{" "}
                          commented <Moment fromNow>{item.created_at}</Moment>
                        </p>
                      </div>
                      <ReactMarkdown source={item.body}></ReactMarkdown>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={3}>
            <Row
              className="m-1 mt-3 border-bottom flex-column"
              style={{ fontSize: "15px" }}
            >
              <p>Assignees</p>
              {issue.assignee ? (
                ""
              ) : (
                <p style={{ color: "grey" }}>No one assigned</p>
              )}
            </Row>
            <Row
              className="m-1 mt-3 border-bottom flex-column"
              style={{ fontSize: "15px" }}
            >
              <p>Projects</p>
              <p style={{ color: "grey" }}>None yet</p>
            </Row>
            <Row
              className="m-1 mt-3 border-bottom flex-column"
              style={{ fontSize: "15px" }}
            >
              <p>Milestone</p>
              <p style={{ color: "grey" }}>No milestone</p>
            </Row>
            <Row
              className="m-1 mt-3 border-bottom flex-column"
              style={{ fontSize: "15px" }}
            >
              <p>Linked pull requests</p>
              <p style={{ color: "grey" }}>
                Successfully merging a pull request may close this issue.
              </p>
              <p style={{ color: "grey" }}>None yet.</p>
            </Row>
            <Row
              className="m-1 mt-3 border-bottom flex-column"
              style={{ fontSize: "15px" }}
            >
              <div>
                <p style={{ fontWeight: "bold", float: "left" }}>
                  Notifications
                </p>
                <p style={{ float: "right" }}>Customize</p>
              </div>
              <button className="btn btn-info">
                <i className="far fa-bell"></i> Subscribe
              </button>
              <p style={{ color: "grey" }}>
                You’re not receiving notifications from this thread.
              </p>
            </Row>
            <Row
              className="m-1 mt-3 border-bottom flex-column"
              style={{ fontSize: "15px" }}
            >
              {users ? (
                Object.keys(users).length == 1 ? (
                  <p style={{ color: "grey" }}>1 participant</p>
                ) : (
                  <p style={{ color: "grey" }}>
                    {Object.keys(users).length} participants
                  </p>
                )
              ) : (
                ""
              )}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Col md={2}>
              <div>

              </div>
            </Col>
              <Col md={10}>{issue.state === "closed" ? <h3 style={{color:"crimson"}}>This issues was closed <Moment fromNow>{issue.closed_at}</Moment> by {issue.closed_by.login}</h3> : ""}</Col>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <div class="post-cmt-form">
              <Row>
                <Col md={2}>
                  <div className="create-iss-avatar">
                    {authUser[0] === null ? (
                      <></>
                    ) : (
                      <img src={authUser[0].avatar_url}></img>
                    )}
                  </div>
                </Col>
                <Col md={10}>
                  <div className="create-cmt-form">
                    <Form>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          onChange={(e) => getBody(e)}
                          as="textarea"
                          rows="3"
                          placeholder="Leave a comment"
                        />
                      </Form.Group>
                      <Button
                        onClick={(e) => postAnComment(e)}
                        variant="success"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
