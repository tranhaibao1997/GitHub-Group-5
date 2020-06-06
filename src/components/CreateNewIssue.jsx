import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";
import { navigate } from "@reach/router";

export default function CreateNewIssue({ match }) {
  let { setIssueList, user } = React.useContext(StoreContext);

  let [title, setTitle] = React.useState("");
  let [body, setBody] = React.useState("");

  function getTitle(e) {
    setTitle(e.target.value);
  }
  function getBody(e) {
    setBody(e.target.value);
  }
  async function postAnIssue(e) {
    e.preventDefault();
    try {
      const issue = { title:`${title}` , body:`${body}`  };
      const url = `https://api.github.com/repos/${match.params.owner}/${match.params.repository}/issues`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${localStorage.token}`,
        },
        body: JSON.stringify(issue),
      });
      console.log(issue)
      console.log(response);
      setIssueList(match.params.owner, match.params.repository);
      navigate(`/repos/${match.params.owner}/${match.params.repository}/issues`);
    //   window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <Row>
        <Col md={1}>
          <div className="create-iss-avatar">
            {user[0] === null ? <></> : <img src={user[0].avatar_url}></img>}
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
    </div>
  );
}
