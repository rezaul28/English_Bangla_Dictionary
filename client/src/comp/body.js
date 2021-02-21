import React from 'react';

import "./body.css"
function Body(probs) {
    const Ban_syns= (ban_syns)=>{
        if(!ban_syns.ban_syns){
          return <p></p>
        }
        let str = ban_syns.ban_syns[0]

        for(let i=1;i<ban_syns.ban_syns.length;i++){
            str+=", "+ban_syns.ban_syns[i]
        }
       return <p><b>Synonyms</b><br></br>{str}</p>
    }
    const Sentence = (sents) => {
      sents = sents.sents;
      
        if(!sents){
          return <p></p>
        }
        let str = sents[0]
        
        let abc=str.replace('<b>','')
        abc=abc.replace("</b>","")
       return ( <p><b>Example</b><br></br>{abc}</p>)
    }
    if(probs.probs.bn){
      console.log(probs.probs.bn);
      return (
        <div className="body">
          <p><b>{probs.probs.en} : {probs.probs.bn}</b></p>
          <br></br>
          <Ban_syns ban_syns={probs.probs.en_syns}/>
          <br></br>
          <Sentence sents={probs.probs.sents}/>
  
        </div>
      )
    }else{
      return (
        <div className="body">
          <p>Sorry! Word not found</p>
        </div>
      );
    }
    
  }
  
export default Body;
