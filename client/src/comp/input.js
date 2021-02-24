
import React, { useState } from 'react';
import Body from "./body"

import "./input.css"
function Input() {
  const [word,setWord] = useState('')
  const [data,setdata] =useState("")
  const setword = event => {
    setWord(event.target.value)
  }
  const submit =async (event)=>{
    let abc = {
      en : ""
    }
    event.preventDefault();
    try{const data = await fetch('https://polar-springs-98937.herokuapp.com/get_word?word='+word, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }})
      abc = await data.json()
      setdata(abc);
    }catch{
        abc.en = "Word not found"
        setdata(abc);
      }
      setWord("");
      console.log(data);
      console.log(abc);
      
  }
    return (
      <div className="input">
        <form onSubmit={submit}>
            <input
             type="text"
              id="input"
              name="input"
               placeholder="Type English word here"
               onChange ={setword}
               value = {word}
            ></input><br></br><br></br>
            <input 
              type="submit" 
              value="Submit"
              ></input>
        </form>
        <Body probs ={data}/>
      </div>
    );
  }
  
export default Input;