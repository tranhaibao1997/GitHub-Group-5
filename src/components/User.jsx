import React from "react";
import { StoreContext } from "./../ThemeContext";
import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserRepos from "./UserRepos";

export default function User({ match }) {
  React.useEffect(() => {
    if (match) {
      getUserReps(match.params.username);
      getUser(match.params.username);
      getUserSub(match.params.username)
    }
  }, []);
  let [repos, setRepos] = React.useState(null);
  let [user, setUser] = React.useState(null);
  let [sub, setSub] = React.useState(null);

  async function getUserReps(username) {
    // const issue = { title: "testing", body: "This is a test issue" };
    const url = `https://api.github.com/users/${username}/repos`;
    const res = await fetch(url);
    const data = await res.json();
    setRepos(data);
  }

  async function getUser(username) {
    // const issue = { title: "testing", body: "This is a test issue" };
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${localStorage.token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  }

  async function getUserSub(username) {
    // const issue = { title: "testing", body: "This is a test issue" };
    const url = `https://api.github.com/users/${username}/orgs`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data,"data from sub");
    
  }

  console.log(user);
  if (user === null || repos === null) {
    return <div></div>;
  } else {
    return (
      <div className="profile-wrapper">
        <div className="user-info-wrapper">
          <Row>
            <Col md={3}>
              <div className="img-container">
                <img id="profile-avatar" src={user.avatar_url}></img>
              </div>
            </Col>

            <Col md={9}>
              <div className="user-info">
                <h1 >{user.login}</h1>
                <p>{user.bio}</p>
                <ul className="resp-footer">
                  <li>{user.location}</li>
                  <li>{user.blog}</li>
                  <li></li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          <Col md={7}>
            <div className="user-repo-header repo-header-user">
              <Row>
                <Col md={7}>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                  </Form>
                </Col>
                <Col md={5}>
                  <div className="btn-section">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Type: All"
                    >
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
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Language: All"
                    >
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
                    <button className="create-user-repo">
                      <i class="fas fa-book"></i> New
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            
          </Col>
          <ul className="list-repo">
              {repos.map((repo) => {
                return <UserRepos repo={repo}></UserRepos>;
              })}
            </ul>
          
        </Row>
      </div>
    );
  }
}
