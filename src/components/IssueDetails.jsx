import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

export default function IssueDetails(props) {
    let [issue, setIssue] = useState("");
    let [state, setState] = useState("");

    const getIssue = async() => {
        try {
            let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${props.ownerName}/${props.respName}/issues/${props.issueNumber}`;
            let data = await fetch(url);
            let result = await data.json();
            setIssue(result);
            setState(result.state);
            console.log("Result", result);
        } catch (error) {
            alert(error);
        }
    }

    function capFirst(string) {
        let x = string;
        return x.charAt(0).toUpperCase() + x.slice(1);
    }

    function formatDate(string) {
        let temp = string.substring(0, 10).split("-");
        return temp[1] + "-" + temp[2] + "-" + temp[0];
    }

    useEffect(() => {
        getIssue();
    }, [])
    if (!issue) {
        return(
            <div></div>
        )
    }
    return(
        <div>
            <Container style={{border: "1px solid black", padding: "10px"}}>
                <Row className="border-bottom pb-3">
                    <Col sm="8">
                        <h4>{issue.title} <span className="text-muted">#{issue.number}</span></h4>
                        <div>
                            <button className={issue.state === "closed" ? `btn btn-danger` : `btn btn-succes`}> <i className="fas fa-times-circle"></i> {capFirst(state)}</button>
                            <p className="text-muted" style={{display: "inline", padding: "10px"}}>
                                <a className="text-muted" href="#">{issue.closed_by.login}</a> opened this issue on {formatDate(issue.created_at)}
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{float: "right"}}>
                            <button className="btn btn-dark mr-2">Edit</button> 
                            <button className="btn btn-success">New Issue</button>
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}
