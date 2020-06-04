import React, { useState } from "react";
import Issue from "./Issue";
import { Container } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";

function IssuesList(props) {

  let { respName, ownerName,issueList } = React.useContext(StoreContext);

  
  console.log("List:", issueList);

  return (
    <div>
      <div className="header">
        <div className="header-wrapper">
          <div className="repo-head">
            <h1>
                <span><i class="fas fa-book"></i></span>
                <span></span>
                <span></span>
            </h1>
          </div>
        </div>
      </div>
      {issueList ? (
        <div>
          {issueList.map((item) => {
            return <Issue issue={item} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default IssuesList;
