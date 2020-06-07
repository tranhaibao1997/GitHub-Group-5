import React, { useState, useEffect } from "react";
import Issue from "./Issue";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";

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
import { navigate } from "@reach/router";
import { Link } from "react-router-dom";

function IssuesList({ match }) {
  let { setIssueList, authUser, issueList } = React.useContext(StoreContext);
  let [repo, setRepo] = React.useState(null);

  let [title, setTitle] = React.useState("");
  let [body, setBody] = React.useState("");

  let [page, setPage] = React.useState(1);

  function getTitle(e) {
    setTitle(e.target.value);
  }
  function getBody(e) {
    setBody(e.target.value);
  }
  async function postAnIssue(e) {
    e.preventDefault();
    if(title.split("").length <20)
    {
      alert("Title must be longer than 20 letters ")
      return;
    }
    if(body.split("").length <20)
    {
      alert("Body must be longer than 50 letters ")
      return;
    }
    try {
      const issue = { title: `${title}`, body: `${body}` };
      const url = `https://api.github.com/repos/${match.params.owner}/${match.params.repository}/issues`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${localStorage.token}`,
        },
        body: JSON.stringify(issue),
      });
      console.log(issue);
      console.log(response);
      getIssueList(match.params.owner, match.params.repository);
      navigate(
        `/repos/${match.params.owner}/${match.params.repository}/issues`
      );
      window.location.reload();
    } catch (err) {}
  }

  useEffect(() => {
    if (match) {
      getIssueList(match.params.owner, match.params.repository,1);
      getRepo(match.params.owner, match.params.repository);
    }
  }, []);

  const [modalShow, setModalShow] = React.useState(false);

  async function getIssueList(ownerName, respName,pageNum) {
    try {
      let url = `https://api.github.com/repos/${ownerName}/${respName}/issues?page=${pageNum}&per_page=10&state=open`;
      let data = await fetch(url);
      let result = await data.json();
      console.log(result, "this is from url");

      setIssueList(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function getRepo(ownerName, respName) {
    try {
      let url = `https://api.github.com/repos/${ownerName}/${respName}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${localStorage.token}`,
          Accept: "application/vnd.github.scarlet-witch-preview+json",
        },
      });
      let result = await data.json();
      console.log(result, "REPO INFo");

      setRepo(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function filterIssues(e) {
    console.log(e);
    if (e == "all") {
      try {
        let url = `https://api.github.com/repos/${match.params.owner}/${match.params.repository}/issues?page=1&per_page=10&state=all`;
        let data = await fetch(url);
        let result = await data.json();
        console.log(url, "this is from url");

        setIssueList(result);
      } catch (err) {
        console.log(err);
      }
    }
    if (e == "closed") {
      try {
        let url = `https://api.github.com/repos/${match.params.owner}/${match.params.repository}/issues?&state=closed&page=1&per_page=10`;
        let data = await fetch(url);
        let result = await data.json();
        console.log(url, "this is from url");
        setIssueList(result);
      } catch (err) {
        console.log(err);
      }
    }
    if (e === "created") {
      try {
        let url = `https://api.github.com/repos/${match.params.owner}/${match.params.repository}/issues?page=1&per_page=10&filter=created`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `token ${localStorage.token}`,
          },
        });
        console.log(url);
        let result = await response.json();
        console.log(result);

        setIssueList(result);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function changePage(num) {
    setPage(num);
    getIssueList(match.params.owner,match.params.repository,num)
  }

  return (
    <div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header onClick={() => setModalShow(false)} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={1}>
              <div className="create-iss-avatar">
                {authUser[0] === null ? (
                  <></>
                ) : (
                  <img src={authUser[0].avatar_url}></img>
                )}
              </div>
            </Col>
            <Col md={11}>
              <div className="create-iss-form">
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      onChange={(e) => getTitle(e)}
                      type="text"
                      placeholder="Title"
                    />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      onChange={(e) => getBody(e)}
                      as="textarea"
                      rows="10"
                      placeholder="Leave a comment"
                    />
                  </Form.Group>
                  <Button
                    onClick={(e) => postAnIssue(e)}
                    variant="success"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {issueList && match && repo ? (
        issueList.message ? (
          <>
            <NotFound></NotFound>
          </>
        ) : (
          <div>
            <div className="header">
              <Row className="repo-head">
                <Col className="repoName">
                  <i class="far fa-bookmark"></i>
                  <Link to={`/user/${match.params.owner}`}>{match.params.owner}</Link>
              
                  <span> / </span>
         
                  <Link to={`"/repos/${match.params.owner}/${match.params.repository}/issues"`}>{match.params.repository}</Link>
                    
                
                </Col>
                <Col className="repoStat">
                  <ul className="repoStatList">
                    <li>
                      <button>
                        <i class="fas fa-cube"></i>Sub
                      </button>
                      <span>{repo.subscribers_count}</span>
                    </li>
                    <li>
                      <button>
                        <i class="far fa-eye"></i>Watch
                      </button>
                      <span>{repo.watchers_count}</span>
                    </li>
                    <li>
                      <button>
                        <i className="far fa-star"></i>Star
                      </button>
                      <span>{repo.stargazers_count}</span>
                    </li>
                    <li>
                      <button>
                        <i class="fas fa-code-branch"></i>Fork
                      </button>
                      <span>{repo.forks_count}</span>
                    </li>
                  </ul>
                </Col>
              </Row>
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
              <Row className="issues-list-control">
                <Col>
                  <div className="filterMenu">
                    <DropdownButton
                      className="filterBtn"
                      id="dropdown-basic-button"
                      title="Filter"
                      onSelect={filterIssues}
                    >
                      <Dropdown.Item eventKey="all">
                        All issues and pull requests
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="closed">
                        Close issues and pull requests
                      </Dropdown.Item>
                      {/* <Dropdown.Item eventKey="created">
                          Your issues
                        </Dropdown.Item> */}
                    </DropdownButton>
                    <Form inline>
                      <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                      />
                    </Form>
                  </div>
                </Col>
                <Col>
                  <div className="add-new-issue">
                    <Button
                      variant="success"
                      onClick={() => setModalShow(true)}
                    >
                      Add New Issue
                    </Button>{" "}
                  </div>
                </Col>
              </Row>
              <div className="Pagination">
                      <span><i style={{color: "forestgreen"}} class="fas fa-exclamation-circle"></i> Open Issues: {repo.open_issues}</span>
                <Pagination
                  currentPage={page}
                  totalPages={Math.floor(repo.open_issues / 10)}
                  changeCurrentPage={changePage}
                  theme="square-fill"
                />
              </div>
              {issueList.map((item) => {
                return (
                  <Container>
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
