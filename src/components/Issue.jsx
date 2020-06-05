import React from 'react';
import {Row, Col} from 'react-bootstrap'

function Issue(props) {
    let issue = props.issue

    let bgColor = "#" + issue.labels[0].color
    console.log("Color:", bgColor)

    return (
        <Row className="issueContainer">
            <Col md={1} className="issueIcon">
                <i class="fas fa-exclamation-circle"></i>
            </Col>
            <Col md={10} className="issueInfo">
                <Row>
                    <h3 className="issueTitle">{issue.title}</h3>
                    {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>}
                </Row>
                <Row>
                    <span className="issueDesc">#{issue.number} opened {issue.updated_at} by {issue.user.login}</span>
                </Row>
            </Col>
            <Col md={1} className="issueCom">
                <i class="far fa-comment-alt"></i>
            </Col>
        </Row>
    );
}

export default Issue;