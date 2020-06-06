import React, { useState, useEffect } from "react";
import Issue from "./Issue";
import {
  Container,
  DropdownButton,
  Row,
  Col,
  Dropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";
import NotFound from "./NotFound";

function IssuesList({ match }) {
  let {
    respName,
    ownerName,
    issueList,
    setIssueList,
    token,
  } = React.useContext(StoreContext);
  useEffect(() => {
    if (match) {
      getIssueList(match.params.owner, match.params.repository);
    }

    // console.log(match.params.owner)
    // console.log(match.params.repository)
    console.log(match);
  }, []);

  async function getIssueList(ownerName, respName) {
    try {
      let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues?page=1&per_page=10`;
      let data = await fetch(url);
      let result = await data.json();
      console.log(result, "this is from url");

      setIssueList(result);
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  }
  async function postAnIssue() {
    try {
      const issue = { title: "testing", body: "This is a test issue" };
      const url = `https://api.github.com/user/repos`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${localStorage.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      {issueList && match ? (
        issueList.message ? (
          <>
            <NotFound></NotFound>
          </>
        ) : (
          <div>
            <div className="header">
              <div className="header-wrapper">
                <div className="repo-head">
                  <h1>
                    <span>
                      <i className="fas fa-book"></i>
                    </span>
                    <a href="#">{match.params.owner}</a>
                    <span>/</span>
                    <a href="#">{match.params.repository}</a>
                  </h1>
                </div>
                <ul></ul>
              </div>
            </div>
            <div className="banner">
              <div className="banner-content">
                <h4>
                  <i className="fas fa-hand-peace"></i>Want to contribute to{" "}
                  {match.params.owner}/{match.params.repository}?
                </h4>
                <p>
                  If you have a bug or an idea, read the{" "}
                  <a href="#">contributing guidelines</a> before opening an
                  issue.
                </p>
                <p>
                  If you're ready to tackle some open issues, we've{" "}
                  <a href="#">collected some good first issues for you .</a>
                </p>
              </div>
            </div>
            <div className="issues-list">
              <div className="issues-list-control">
                <Row>
                  <Col md={1}>
                    <DropdownButton id="dropdown-basic-button" title="Filter">
                      <Dropdown.Item href="#/action-1">
                        Open issues and pull requests
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Your issues
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Your pull requests
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        Everything assigned to you
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-5">
                        Everything mentioning you
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                  <Col md={5}>
                    <Form inline>
                      <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                      />
                    </Form>
                  </Col>
                  <Col md={4}></Col>
                  <Col md={2}>
                    <div className="add-new-issue">
                      <Button onClick={() => postAnIssue()} variant="success">
                        Add New Issue
                      </Button>{" "}
                    </div>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col md={8}></Col>
                <Col md={3}></Col>
                <Col md={1}></Col>
              </Row>
              {issueList.map((item, index) => {
                return (
                  <Container key={index}>
                    <Issue
                      ownerName={match.params.owner}
                      respName={match.params.repository}
                      issue={item}
                    />
                  </Container>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default IssuesList;
