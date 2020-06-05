import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";

export default function IssueDetails(props) {
    let [issue, setIssue] = useState("");
    let [comment, setComment] = useState("");
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

    const getComment = async() => {
        try {
            let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${props.ownerName}/${props.respName}/issues/${props.issueNumber}/comments`;
            let data = await fetch(url);
            let result = await data.json();
            setComment(result);
            console.log("Comment", result);
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
        getComment();
    }, [])
    if (!issue || !comment) {
        return (
            <div></div>
        )
    }
    return(
        <div>
            <Container style={{border: "1px solid black", padding: "10px"}}>
                <Row className="border-bottom pb-2">
                    <Col sm="8">
                        <h4>{issue.title} <span className="text-muted">#{issue.number}</span></h4>
                        <div>
                            <button className={issue.state === "closed" ? `btn btn-danger` : `btn btn-success`}> <i className="fas fa-times-circle"></i> {capFirst(state)}</button>
                            <p className="text-muted" style={{display: "inline", padding: "10px"}}>
                                <a className="text-muted" href={issue.user.url}>{issue.user.login}</a> opened this issue on {formatDate(issue.created_at)}
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
                <Row className="mt-2" style={{padding: "5px 15px"}} noGutters={true}>
                    <Col sm={1} >
                        <img src={issue.user.avatar_url} style={{width: "50px"}}></img>
                    </Col>
                    <Col style={{border: "1px solid grey", padding: "5px"}}>
                        
                        <Row>
                            <p>{issue.body}</p>
                        </Row>
                    </Col>
                </Row>
                {comment.map((item) => {
                    return(
                        <div key={item.id}>
                            <Row className="mt-2" style={{padding: "5px 15px"}} noGutters={true}>
                                <Col sm={1} >
                                    <img src={item.user.avatar_url} style={{width: "50px"}}></img>
                                </Col>
                                <Col style={{border: "1px solid grey", padding: "5px"}} >
                                     <p>{item.body}</p>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
            </Container>
        </div>
    )
}
