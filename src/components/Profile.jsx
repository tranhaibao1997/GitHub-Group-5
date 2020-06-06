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

export default function Profile() {
  React.useEffect(() => {
    getUserReps();
    getUser();
  }, []);
  let [repos, setRepos] = React.useState(null);
  let {
    user
  } = React.useContext(StoreContext);
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
    user[1](data);
  }
  console.log(user[0]);
  console.log(repos)
  if (user[0] === null || repos === null) {
    return <div></div>;
  } else {
    return (
      <div className="profile-wrapper">
        <Row>
          <Col md={4}>
            <div>
              <div className="img-container">
                <img id="profile-avatar" src={user[0].avatar_url}></img>
              </div>

              <p id="profile-name">{user[0].login}</p>
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
            <ul className="list-repo">
                {
                    repos.map(repo =>{
                        return(
                            <UserRepos repo={repo}></UserRepos>
                        )
                    })
                }
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
