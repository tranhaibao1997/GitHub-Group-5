import React from 'react';
import { Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';

function Resp(props) {
    let resp = props.resp
    function getRespTags(name) {
        console.log(name)

    }


    return (
        <Row className="respContainer">
            <Col md={9}>
                <Row className="respIcon">
                    <div>
                        <i class="fas fa-book"></i>
                        <span className="respTitle">
                            {/* <Link to={`/repos/${resp.owner.login}/${resp.name}/issues`}>{resp.owner.login}/{resp.name}</Link> */}
                            <Link to={`/user/${resp.owner.login}`}>{resp.owner.login}</Link>/
                            <Link to={`/repos/${resp.owner.login}/${resp.name}/issues`}>{resp.name}</Link>

                        </span>
                    </div>
                </Row>
                {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}

                <p className="resp-desc">{resp.description}</p>

                {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                <Row>
                    <span className="resp-tags">{getRespTags(resp.full_name)}</span>

                    {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                </Row>
                <Row>
                    <ul className="resp-footer">
                        <li className="starIcon"><i className="far fa-star"></i>{Math.floor(resp.stargazers_count)}</li>
                        <li className="resp-lang"><i class="fas fa-circle"></i><span className="respLang">{resp.language}</span></li>
                        <li>{resp.license ? <span>{resp.license.name}</span> : <span>No</span>}</li>
                        <li>Updated <Moment fromNow>{resp.pushed_at}</Moment></li>
                    </ul>
                    {/* {issue.labels[0].name ? <button className="statusBtn" style={{backgroundColor:`${bgColor}`}}>{issue.labels[0].name}</button> : <span></span>} */}
                </Row>
            </Col>
            <Col md={3} className="resp-owner">
                <div className="respImg"><img src={resp.owner.avatar_url}></img></div>
                <div className="respName"><p>@{resp.owner.login}</p></div>
            </Col>
        </Row>
    );
}

export default Resp;