import React from 'react';
import {Row, Col} from 'react-bootstrap'

function Issue(props) {
    let issue = props.issue

    return (
        <Col className="issueContainer">
            <Row>
                <h3>{issue.title}</h3>
            </Row>
            <Row>
    <p>#{issue.number} opened {issue.updated_at} by {issue.user.login}</p>
            </Row>
        </Col>
    );
}

export default Issue;