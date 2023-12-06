import React, { useEffect } from 'react';
import './index.css';
import { useState } from 'react';
import axios from 'axios';

function First() {

    let audio = new Audio()
     




    const api = 'https://api.dictionaryapi.dev/api/v2/entries/en';

    const [data, setData] = useState('');
    const [inpval, setInpval] = useState([]);
    const [error, setError] = useState([]);
    const [sound, setSound] = useState("");

    const clearing = () => {
        setData("")
    }

   

    const handleAudio = () => {
        inpval.filter((ele) => {
            ele.phonetics.forEach((aud) => {
                if (aud.audio) {
                    setSound(aud.audio)
                }
            })
        })
        if(sound !== ""){
            audio.src = sound
            audio.play()
        }
    }

    async function searching() {
        try {
            const find = await axios.get(`${api}/${data}`)
            setInpval(find.data)
            setError("")
        }
        catch (e) {

            let m = e.response.data.message;
            setError(m)
            console.log(error)
        }

    }
    console.log(inpval)
    return (

        <div className='Application'>

            <div className='ajith'>
                <div className='app-1'>
                    <input type="text" value={data} onChange={(e) => setData(e.target.value)} className='text-box' placeholder="Enter the user" />
                    <button className='button' onClick={searching}>SEARCH</button>
                    <button className='button' onClick={clearing}>CLEAR</button>
                </div>

                <div className='appname'>

                    <img className='music' onClick={() => handleAudio()} src="beeping.webp" width={'60px'} height={'50px'} />

                </div>

            </div>

            <div className='fetching'> {
                !error ?
                    inpval.map((values) => {
                        return (
                            <>
                                <div className='gun-1'>
                                    <p>{values.word}</p>
                                    <br />
                                    <p><b>NOUN</b></p>
                                    {
                                        values.meanings[0].definitions.map((content) => {
                                            return (
                                                <ul>
                                                    <li>{content.definition}</li>
                                                </ul>
                                            )
                                        })
                                    }
                                </div>

                                <div className='gun-2'>
                                    <p><b>Verb</b></p><br />
                                    {
                                        values.meanings[1].definitions.map((contents) => {
                                            return (
                                                <ul>
                                                    <li>{contents.definition}</li>
                                                </ul>
                                            )
                                        })
                                    }
                                </div>

                            </>
                        )
                    }
                    )
                    :
                    <p>{error}</p>
            }
            </div>
        </div>


    )
}

export default First;
