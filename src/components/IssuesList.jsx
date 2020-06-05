import React, { useState, useEffect } from "react";
import Issue from "./Issue";
import { Container } from "react-bootstrap";
import { StoreContext } from "./../ThemeContext";

function IssuesList({match}) {
  let { respName, ownerName, issueList, setIssueList } = React.useContext(StoreContext);
  useEffect(() => {
    if(match)
    {
      getIssueList(match.params.owner,match.params.repository)
    }
    
    // console.log(match.params.owner)
    // console.log(match.params.repository)
    console.log(match)
  },[])

  console.log("List:", issueList)

  async function getIssueList(ownerName, respName) {
    let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${ownerName}/${respName}/issues?page=1&per_page=20`;
    let data = await fetch(url);
    let result = await data.json();
    console.log(result,"this is from url")
    // navigate(`/${ownerName}/${respName}`);

    setIssueList(result);
  };
  return (
    <div>


      {
        issueList && match ? <div>
          <div className="header">
            <div className="header-wrapper">
              <div className="repo-head">
                <h1>
                  <span>
                    <i className="fas fa-book"></i>
                  </span>
                  <a href="#">{match.params.owner}</a>
                  <span>/</span>
                  <a href="#">{match.params.repository}</a>
                </h1>
              </div>
              <ul></ul>
            </div>
          </div>
          <div className="banner">
            <div className="banner-content">
              <h4><i className="fas fa-hand-peace"></i>Want to contribute to {match.params.owner}/{match.params.repository}?</h4>
              <p>If you have a bug or an idea, read the <a href="#">contributing guidelines</a> before opening an issue.</p>
              <p>If you're ready to tackle some open issues, we've <a href="#">collected some good first issues for you .</a></p>
            </div>
          </div>
          {issueList.map(item => {
            return <Container><Issue ownerName={match.params.owner} respName={match.params.repository} issue={item} /></Container>
          })}
        </div> : <div></div>
      }

    </div>
  );


}

export default IssuesList;
