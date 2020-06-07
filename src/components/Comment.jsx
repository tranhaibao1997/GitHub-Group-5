import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

export default function Comment({ item, match }) {
  React.useEffect(() => {
    if (match) {
   
    }
  }, []);
  
  
  return (
    <div>
      <div key={item.id}>
        <Row className="mt-5">
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
            style={{
              border: "1px solid #d1d5da",
              padding: "5px",
              position: "relative",
            }}
          >
            <div className="post-time">
              <p>
                <span style={{ fontWeight: 600 }}>{item.user.login}</span>{" "}
                commented <Moment fromNow>{item.created_at}</Moment>
              </p>
            </div>
            <ReactMarkdown source={item.body}></ReactMarkdown>
            <div className="issue-reaction">
        <i class="far fa-thumbs-up">{item.reactions["+1"]}</i>
              <i class="far fa-thumbs-down">{item.reactions["-1"]}</i>
              <i class="far fa-laugh-beam">{item.reactions["laugh"]}</i>
              <i class="fas fa-spa">{item.reactions["heart"]}</i>
              <i class="fas fa-rocket">{item.reactions["rocket"]}</i>
              <i class="far fa-eye">{item.reactions["eyes"]}</i>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
