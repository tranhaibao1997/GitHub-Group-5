import React, { useState } from "react";
import Issue from "./Issue";
import { Container } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";

function IssuesList(props) {
  let { respName, ownerName, issueList } = React.useContext(StoreContext);

  console.log("List:", issueList);

  return (
    <div>
      {issueList ? (
        <div>
          <div className="header">
            <div className="header-wrapper">
              <div className="repo-head">
                <h1>
                  <span>
                    <i className="fas fa-book"></i>
                  </span>
                  <a href="#">{ownerName[0]}</a>
                  <span>/</span>
                  <a href="#">{respName[0]}</a>
                </h1>
              </div>
              <ul></ul>
            </div>
          </div>
          <div className="banner">
            <div className="banner-content">
      <h4><i className="fas fa-hand-peace"></i>Want to contribute to {ownerName[0]}/{respName[0]}?</h4>
                <p>If you have a bug or an idea, read the <a href="#">contributing guidelines</a> before opening an issue.</p>
                <p>If you're ready to tackle some open issues, we've <a href="#">collected some good first issues for you .</a></p>
            </div>
          </div>
          {issueList.map((item) => {
            return <Issue key={item.id} issue={item} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default IssuesList;
