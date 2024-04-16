import React, { useState } from 'react'
import '../styles/Testcontainer.css'
import Resultcontainer from './Resultcontainer'
import LoopIcon from '@mui/icons-material/Loop';

const Testcontainer = () => {

    const [selectedTiming, setSelectedTiming] = useState('0:10');
    const [paragraph, setParagraph] = useState('');
    const [input,setInput] = useState('')
    const handleSelectedTime = (time) => {
        setSelectedTiming(time)
    }
    const handleParagraph = (para) => {
        setParagraph(para);
    }
    const handleInput = (event) => {
        console.log(event.target.value);
        setInput(event.target.value)
        
    }
    
    return (
        <>
            <div className='container' id="test-container">
                <div id="text-container">
                    <div id="text_highlight"></div>
                    <div id="test-text" style={{ opacity: paragraph.paragraph ? 1 : 0 }}>
                        {paragraph.paragraph}
                    </div>

                </div>
                <div id="test-bar">
                    <div className="input_item">
                        <input type="text" id='input_field' autoComplete='off' onChange={handleInput} />
                    </div>
                    <div className="bar-items">
                        <div id="wpm_display_container" className='speed_classes'>0 <small>WPM</small></div>
                        <div id="timer_display_container" className='speed_classes'>{selectedTiming}</div>
                        <button id="reset_button" className=''><LoopIcon /></button>
                    </div>
                </div>
            </div>
            <Resultcontainer onSelectedTime={handleSelectedTime} showData={handleParagraph} />
        </>
    )
}

export default Testcontainer