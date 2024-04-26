import React, { useRef, useState , useEffect } from 'react'
import '../styles/Testcontainer.css'
import Resultcontainer from './Resultcontainer'
import LoopIcon from '@mui/icons-material/Loop';

const Testcontainer = () => {

    const [selectedTiming, setSelectedTiming] = useState(10);
    const [paragraph, setParagraph] = useState('');
    const [wpm_visibility, set_wpm_visibility] = useState('on')
    const [timer_visibility, set_timer_visibility] = useState('on');
    const [timerRunning, setTimerRunning] = useState(false)
    // const [seconds, setSeconds] = useState(10);
    const [typingStart,setTypingStart] = useState(false)
    const inputRef = useRef(null);


    const handleSelectedTime = (time) => {
        setSelectedTiming(time)

    }
    const handleParagraph = (para) => {
        setParagraph(para);
        inputRef.current.focus()
    }

    const get_wpm_visibility = (visibility) => {
        set_wpm_visibility(visibility);
    }

    const get_timer_visibility = (visibility) => {
        set_timer_visibility(visibility);
    }


    const backspace_clicked = (event) => {
        console.log(event);

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            return true;
        }
        return false;
    }


    const moveToNextWord = (idx, para) => {
        while (idx < para.length && para[idx] !== ' ') {
            idx++;
        }
        return idx + 1;
    }
    

    useEffect(() => {
        const intervalId = setInterval(() => {
          if (selectedTiming > 0) {
            setSelectedTiming(prevSeconds => prevSeconds - 1);
          } else {
            clearInterval(intervalId); 
            inputRef.current.disabled=true
            
            // setSelectedTiming(10)
          }
        }, 1000);
      
        return () => clearInterval(intervalId);
      }, [selectedTiming,typingStart]); 



    let paraIdx = 0, correctChar = 0, incorrectChar = 0, isPrevCorrect = [];
    const compareText = (event, paragraph) => {
        setTypingStart(true)
        if(!timerRunning){
            
            setTimerRunning(true)
        }

        let userInput = event.target.value;
        let para = paragraph.split("");


        if (backspace_clicked(event)) {
            // console.log("clicked");
            paraIdx -= 1;
            if (isPrevCorrect[isPrevCorrect.length - 1] === 'correct') {
                correctChar--;
                isPrevCorrect.pop()
            } else {
                isPrevCorrect.pop()
                incorrectChar--;
            }
            // console.log("Paraidx after backspace hit: ",paraIdx," ",curr_user_char);
        } else {
            let curr_user_char = userInput[userInput.length - 1];
            let curr_para_char = para[paraIdx];

            // if user press space empty input field
            if (curr_user_char === ' ') {
                inputRef.current.value = ' '
            }

            // if user press space but there is no space in paragraph then move to the next word of paragraph
            if (curr_user_char === ' ' && curr_para_char !== ' ') {
                let prevParaIdx = paraIdx;
                paraIdx = moveToNextWord(paraIdx, para);
                incorrectChar = incorrectChar + (paraIdx - prevParaIdx - 1);
            } else {
                paraIdx++;
            }


            // checking usertyped character and paragraph character
            if (curr_user_char === curr_para_char) {
                correctChar++;
                isPrevCorrect.push("correct");
                console.log("Correct: ", curr_user_char);
                // console.log("UserIdx: ",userIdx," ","ParaIdx: ",paraIdx," ","UserInput: ",userInput[userIdx]," ","para: ",para[paraIdx]);

            } else {
                // console.log(curr_user_char, " ", curr_para_char);
                incorrectChar++;
                isPrevCorrect.push("incorrect");
                console.log("Wrong");
            }
        }


        console.log("Correct: ", correctChar, " ", "Incorrect: ", incorrectChar);
    }

    const formatSecondsToTimeString = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes < 10 ? String(minutes) : String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
      };
      
     
      

    return (
        <>
            <div className='container' id="test-container">
                <div id="text-container">
                    <div id="text_highlight"></div>
                    <div id="test-text" style={{ opacity: paragraph.paragraph ? 1 : 0 }}>
                        {paragraph.paragraph && paragraph.paragraph.split('').map((char, index) => (
                            <span key={index} className=''>{char}</span>
                        ))}
                    </div>


                </div>
                <div id="test-bar">
                    <div className="input_item">
                        <input
                            type="text"
                            id='input_field'
                            autoComplete='off'
                            onChange={(event) => compareText(event, paragraph.paragraph)}
                            onInput={backspace_clicked}
                            // onKeyUp={(event)=>{compareText(event,paragraph.paragraph)}}
                            ref={inputRef} />
                    </div>
                    <div className="bar-items">
                        <div id="wpm_display_container" className='speed_classes'>
                            {wpm_visibility === 'on' ? <span>0<small> WPM</small></span> : ""}
                        </div>
                        <div id="timer_display_container" className='speed_classes'>
                            {timer_visibility === 'on' ? formatSecondsToTimeString(selectedTiming) : ""}
                        </div>

                        <button id="reset_button" className=''><LoopIcon /></button>
                    </div>
                </div>
            </div>
            <Resultcontainer
                onSelectedTime={handleSelectedTime}
                showData={handleParagraph}
                get_wpm_visibility={get_wpm_visibility}
                get_timer_visibility={get_timer_visibility}
            />
        </>
    )
}

export default Testcontainer