import React from 'react';
import icon from "../images/icon.png"
import "./header.css"
function Header(probs) {
    return (
      <div className="header">
        <img src = {icon} width="300" height="300"></img>
        <h1>{probs.probs.name}</h1>
      </div>
    );
  }
  
  export default Header;
