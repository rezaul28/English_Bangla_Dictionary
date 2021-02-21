import React from 'react';

import "./body.css"
function Body(probs) {
    let abc=probs.probs.bn_syns;
    const Ban_syns= (ban_syns)=>{
        let str = ''
        for(let i=0;i<ban_syns.ban_syns.length;i++){
            str+=ban_syns.ban_syns[i]+", "

        }
       return <p>{str}</p>
    }
    return (
      <div className="body">
        <p><b>{probs.probs.en}</b></p>
        <p>{probs.probs.pron}</p>
        <p>{probs.probs.bn}</p>
        <Ban_syns ban_syns={abc}/>
        <p>{probs.probs.sents[0]}</p>

      </div>
    );
  }
  
export default Body;
