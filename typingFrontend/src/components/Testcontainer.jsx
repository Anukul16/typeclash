import React, { useRef, useState } from 'react'
import '../styles/Testcontainer.css'
import Resultcontainer from './Resultcontainer'
import LoopIcon from '@mui/icons-material/Loop';

const Testcontainer = () => {

    const [selectedTiming, setSelectedTiming] = useState('0:10');
    const [paragraph, setParagraph] = useState('');
    const [wpm_visibility, set_wpm_visibility] = useState('on')
    const [timer_visibility, set_timer_visibility] = useState('on');
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

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

    const get_wpm_visibility = (visibility) => {
        set_wpm_visibility(visibility);
    }

    const get_timer_visibility = (visibility) => {
        set_timer_visibility(visibility);
    }



    // let i =0;
    // const compareText = (event, paragraph) => {
    //     const userInput = event.target.value;
    //     const chars = paragraph.split("");
    //     console.log("Idx: ",i,"UserInput lentgth: ",userInput.length);
    //     for (; i < userInput.length;) {

    //         const userChar = userInput[i];
    //         const paragraphChar = chars[i];

    //         if (userChar === paragraphChar) {
    //             console.log(`Correct character: ${userChar}`);
    //         } else {
    //             console.log(`Wrong character: ${userChar}`);
    //         }
    //         if(userChar === ' '){

    //             inputRef.current.value=''
    //         }
    //         if(paragraphChar !== ' ' && userChar === ' '){
    //             i=moveToNextWord(i,chars);
    //             console.log("Space Clicked");
    //             console.log("Next Idx: ",i);

    //         }else{
    //             i++;
    //         }
    //     }
    // };

    let currentIndex = 0; // Initialize currentIndex outside the function

    const compareText = (event, paragraph) => {
        const userInput = event.target.value;
        const chars = paragraph.split("");
        console.log("Current Index: ", currentIndex);

        for (; currentIndex < userInput.length;) {
            const userChar = userInput[currentIndex];
            const paragraphChar = chars[currentIndex];

            if (userChar === paragraphChar) {
                console.log(`Correct character: ${userChar}`);
            } else {
                console.log(`Wrong character: ${userChar}`);
            }

            if (paragraphChar === ' ') {
                currentIndex++;
            } else if (userChar === ' ') {
                currentIndex = moveToNextWord(currentIndex, chars);
                console.log("Space Clicked");
                console.log("Next Index: ", currentIndex);
            } else {
                currentIndex++;
            }
        }
    };

    const moveToNextWord = (idx, chars) => {
        while (chars[idx] === ' ' && idx < chars.length) {
            idx++;
        }
        while (chars[idx] !== ' ' && idx < chars.length) {
            idx++;
        }
        return idx;
    };




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
                        <input type="text" id='input_field' autoComplete='off' onChange={(event) => compareText(event, paragraph.paragraph)} ref={inputRef} />
                    </div>
                    <div className="bar-items">
                        <div id="wpm_display_container" className='speed_classes'>
                            {wpm_visibility === 'on' ? <span>0<small> WPM</small></span> : ""}
                        </div>
                        <div id="timer_display_container" className='speed_classes'>
                            {timer_visibility === 'on' ? selectedTiming : ""}
                        </div>

                        <button id="reset_button" className=''><LoopIcon /></button>
                    </div>
                </div>
            </div>
            <Resultcontainer onSelectedTime={handleSelectedTime} showData={handleParagraph} get_wpm_visibility={get_wpm_visibility} get_timer_visibility={get_timer_visibility} />
        </>
    )
}

export default Testcontainer