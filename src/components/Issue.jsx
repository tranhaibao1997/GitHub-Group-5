import React from 'react';
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'

function Issue(props) {
    let issue = props.issue

  

    return (
        <Row className="issueContainer">
            <Col md={1} className="issueIcon">
                <i className="fas fa-exclamation-circle"></i>
            </Col>
            <Col md={9} className="issueInfo">
                <Row>
                    <h3 className="issueTitle"><Link to={`/repos/${props.ownerName}/${props.respName}/issues/${issue.number}`}>{issue.title}</Link></h3>
                    {issue.labels ? issue.labels.map((label, index) =>{
                        return(
                            <button key={index} className="statusBtn" style={{backgroundColor:`${"#" + label.color}`}}>{label.name}</button>
                        )
                    }) :""}
                </Row>
                <Row>
                    <span className="issueDesc">#{issue.number} opened <Moment fromNow>{issue.updated_at}</Moment> by {issue.user.login}</span>
                </Row>
            </Col>
            <Col md={2} className="issueCom">
                {issue.comments ? <div className="issueComIcon"><i class="far fa-comment-alt"></i><span>{issue.comments}</span></div> : <span></span>}
            </Col>
        </Row>
    );
}

export default Issue;