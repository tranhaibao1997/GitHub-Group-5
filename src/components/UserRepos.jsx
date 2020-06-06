import React from "react";
import { Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function UserRepos({ repo }) {
  return (
    <div className="each-user-repo">
      <Row>
        <Col md={9}>
          <h1 className="user-repo-title"> <Link to={`/repos/${repo.owner.login}/${repo.name}/issues`}>{repo.owner.login}/{repo.name}</Link></h1>
          <p className="user-repo-desc">{repo.description}</p>
          <ul className="resp-footer">
            <li className="starIcon">
              <i className="far fa-star"></i>
              {Math.floor(repo.stargazers_count)}
            </li>
            <li className="resp-lang">
              <i class="fas fa-circle"></i>
              <span className="respLang">{repo.language}</span>
            </li>
            <li>
              {repo.license ? (
                <span>{repo.license.name}</span>
              ) : (
                <span>No</span>
              )}
            </li>
            <li>
              Updated <Moment fromNow>{repo.pushed_at}</Moment>
            </li>
          </ul>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
