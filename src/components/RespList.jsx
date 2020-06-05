import React from 'react';
import { StoreContext } from "./../ThemeContext";
import Resp from './Resp';

function RespList(props) {
    let { respList } = React.useContext(StoreContext);
    console.log(respList[0])
    return (

        <>

{
    respList[0]===null ?<div>Loading...</div> :<>
    {
        respList[0].map(elm => {
            return(
                <>
                <Resp resp={elm}></Resp>
                </>
            )
        } )
    }
    
    </>
}
        </>

    );
}

export default RespList;