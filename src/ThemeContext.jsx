import React, { useState } from 'react'


export const StoreContext = React.createContext(null);

export default ({ children }) => {
 
    let [ownerName,setOwnerName]=useState("")
    let [respName,setRespName]=useState("")
    let [issuesList,setIssuesList]=useState(null)
    let [respList,setRespList]=useState(null)
    let [token,setToken]=useState(null)
    
  



    const store = {
     respName:[respName,setRespName],   
     ownerName:[ownerName,setOwnerName],
     issueList:issuesList,
     setIssueList:setIssuesList,
     respList:[respList,setRespList],
     token:[token,setToken]

        
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};