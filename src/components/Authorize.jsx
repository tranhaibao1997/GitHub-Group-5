// import React, { Component } from "react";
// import { StoreContext } from "./../ThemeContext";
// const clientId = "b999438ff44259cd90c7";

// export default class Authorize extends Component {
//   static contextType = StoreContext;
//   constructor(props) {
//     super(props);
//     const existingToken = localStorage.getItem("token");
//     const accessToken =
//       window.location.search.split("=")[0] === "?access_token"
//         ? window.location.search.split("=")[1].split("&")[0]
//         : null;

//     if (!accessToken && !existingToken) {
//       window.location.replace(
//         `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
//       );
//     }

//     if (accessToken) {
//       console.log(`New accessToken: ${accessToken}`);

//       localStorage.setItem("token", accessToken);
//      if(this.context)
//      {
//         this.context.token[1](accessToken);
//      }
    
//     }

//     if (existingToken) {
//         console.log(this.context)
//         if(this.context)
//         {
//            this.context.token[1](existingToken);
//         }
//     }
//   }
//   render() {
//       console.log(this.context)
//     return <div></div>;
//   }
// }
