import React, { useEffect } from 'react';
import { StoreContext } from "./../ThemeContext";
import Resp from './Resp';

function RespList(props, { match }) {
    useEffect(() => {
        getRespList(match.params.repository)
    })
    async function getRespList(resp) {
        let url = `https://cors-anywhere.herokuapp.com/https://api.github.com/search/repositories?q=${resp}`
        let data = await fetch(url);
        let result = await data.json();
        console.log(result)
        respList[1](result.items)


    };
    let { respList } = React.useContext(StoreContext);
    console.log(respList[0])
    return (

        <>

            {
                respList[0] === null ? <div>Loading...</div> : <>
                    {
                        respList[0].map(elm => {
                            return (
                                <>
                                    <Resp resp={elm}></Resp>
                                </>
                            )
                        })
                    }

                </>
            }
        </>

    );
}

export default RespList;