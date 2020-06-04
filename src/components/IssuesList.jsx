import React, { useState } from "react";
import Issue from "./Issue";
import { Container } from "react-bootstrap";

function IssuesList(props) {
  let [issueList, setIssueList] = useState(null);

  const getIssueList = async () => {
    let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/facebook/react/issues?page=1&per_page=20`;
    let data = await fetch(url);
    let result = await data.json();

    setIssueList(result);
  };
  console.log("List:", issueList);

  return (
    <div>
      <button onClick={() => getIssueList()}>Search</button>
      <div className="header">
        <div className="header-wrapper">
          <div className="repo-head">
            <h1>
                <span></span>
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
