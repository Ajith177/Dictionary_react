import React, { useState } from 'react';
import axios from 'axios';


function Second() {

  const api = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  const [make,setMake]=useState("");
  const[products,setProducts]=useState("");
  const[error,setError]=useState("");

  const handleclear =()=>{
    setMake("")
    }

    const handlesearch=async()=>{
      try{
      const data=await axios.get(`${api}/${make}`);
      setProducts(data.data);

      }
      catch(e){
        setError(e.response.data.message)
        console.log(error);
        
      }
    }
    console.log(products);

  return (
    
    <div>
      <h3>DICTIONARY</h3>
      <div  className='main-content'>
        <input  type="text" className='text-box'value={make} onChange={(e)=>setMake(e.target.value)} placeholder="Enter the word"/><br/>
        <button className='button' onClick={handlesearch}> SEARCH</button><br/>
        <button className='button' onClick={handleclear}>CLEAR</button><br/>
      </div>
        <img  className='music' src="beeping.webp" width={'50px'} height={'50px'}/>
       
        <div className='fetched'>
          {
            products?
            products.map((values)=>{
              return(
                <>
                <p>{values.word}</p><br/>
                <p>{values.phonetic}</p><br/>
                <p><b>NOUN</b></p>
                  {
                    values.meanings[0].definitions.map((content)=>{
                      return(
                        <div className='inside-1'>
                        <li>{content.definition}</li><br/>
                        </div>
                      )
                    })
                  }
                  <p><b>Verb</b></p>
                  {
                    values.meanings[1].definitions.map((contents)=>{
                      return(
                        <div className='inside-2'>
                        <li>{contents.definition}</li><br/>
                        </div>
                      )
                    })
                  }
                  
                </>
              )
            })
            :
            <p>{error}</p>
          }
        </div>
    </div>
    
   
  )
}

export default Second;
