import React from 'react';
import { Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'

function Resp(props) {
    let resp = props.resp
    function getRespTags(name)
    {
console.log(name)
    
    }


    return (
        <Row className="issueContainer">
            <Col md={1} className="issueIcon">
                <i class="far fa-bookmark"></i>
            </Col>
            <Col md={8} className="issueInfo">
                <Row>
                    <h3 className="issueTitle">{resp.full_name}</h3>

                    {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                </Row>
                <Row>

                    <span className="resp-desc">{resp.description}</span>

                    {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                </Row>
                <Row>

                    <span className="resp-tags">{getRespTags(resp.full_name)}</span>

                    {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                </Row>
                <Row>

                    <ul className="resp-footer">
                        <li><i className="far fa-star"></i>{Math.floor(resp.stargazers_count)}</li>
                        <li className="resp-lang">{resp.language}</li>
                        <li>{resp.license ? <span>{resp.license.name}</span> : <span>No</span>}</li>
                        <li>Updated <Moment fromNow>{resp.pushed_at}</Moment></li>
                    </ul>
                    {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                </Row>

            </Col>
            <Col md={3} >
                <div className="resp-owner">
                    <img src={resp.owner.avatar_url}></img>
                    <span>@{resp.owner.login}</span>
                </div>
            </Col>
        </Row>
    );
}

export default Resp;