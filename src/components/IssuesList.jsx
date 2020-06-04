import React, {useState} from 'react';
import Issue from './Issue'
import {Container} from 'react-bootstrap'

function IssuesList(props) {
    let [issueList, setIssueList] = useState(null)

    const getIssueList = async() => {
        let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/facebook/react/issues?page=1&per_page=20`
        let data = await fetch(url)
        let result = await data.json()

        setIssueList(result)
    }
    console.log("List:", issueList)

   

    return (
        <div>
            <button onClick={() => getIssueList()}>Search</button>
            {
                issueList ? <div>
                {issueList.map(item => {
                    return <Container><Issue issue={item} /></Container>
                })}
            </div> : <div></div>
            }
           
        </div>
    );
}

export default IssuesList;