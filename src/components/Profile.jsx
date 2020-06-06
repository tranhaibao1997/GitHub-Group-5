import React from 'react'

export default function Profile() {
    async function getUserReps() {
        // const issue = { title: "testing", body: "This is a test issue" };
        const url = `https://api.github.com/user/repos`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `token ${localStorage.token}`,
          },
          
        });
        const data=await response.json()
        console.log(data)
      }
    return (
        <div>
            
        </div>
    )
}
