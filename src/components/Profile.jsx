import React from "react";
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

export default function Profile() {
  React.useEffect(() => {
    getUserReps();
    getUser();
  }, []);
  let [repos, setRepos] = React.useState(null);
  let [user, setUser] = React.useState(null);
  async function getUserReps() {
    // const issue = { title: "testing", body: "This is a test issue" };
    const url = `https://api.github.com/user/repos?sort=created&per_page=10`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${localStorage.token}`,
      },
    });
    const data = await response.json();
    setRepos(data);
  }
  async function getUser() {
    // const issue = { title: "testing", body: "This is a test issue" };
    const url = `https://api.github.com/user`;
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
  console.log(user);
  if (user === null || repos === null) {
    return <div></div>;
  } else {
    return (
      <div>
        <Row>
          <Col md={4}>
            <div>
              <div className="img-container">
                <img id="profile-avatar" src={user.avatar_url}></img>
              </div>

              <p id="profile-name">{user.login}</p>
              <button id="edit-profile">Edit profile</button>
            </div>
          </Col>
          <Col md={8}>
            <div className="user-repo-header">
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
                    <DropdownButton id="dropdown-basic-button" title="Type: All">
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
                    <DropdownButton id="dropdown-basic-button" title="Language: All">
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
                    <button className="add-btn"><i class="fas fa-book"></i> New</button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
