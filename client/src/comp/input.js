
import React from 'react';

import "./input.css"
function Input() {
    return (
      <div className="input">
        <form action="/">
            <input type="text" id="input" name="input" placeholder="Type English word here"></input><br></br><br></br>
            <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
  
export default Input;