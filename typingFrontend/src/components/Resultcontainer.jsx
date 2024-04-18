import React, { useEffect, useState } from 'react';
import '../styles/Resultcontainer.css';

const Resultcontainer = ({onSelectedTime,showData,get_wpm_visibility,get_timer_visibility}) => {
    const [activeClass, setActiveClass] = useState({
        test_duration: '0:10',
        punctuation: 'on',
        numbers: 'on',
        words_list: 'simple',
        show_wpm: 'show',
        show_timer: 'show'
    });
    

    const handleFilter = (category, value,wpm_visibility,timer_visibility) => {
        setActiveClass({ ...activeClass, [category]: value });
        
        if(category === 'test_duration'){
            onSelectedTime(value);
        }
        if(category === 'show_wpm'){
            get_wpm_visibility(wpm_visibility);
        }
        if(category === 'show_timer'){
            get_timer_visibility(timer_visibility);
        }
    };

    useEffect(() => {
        const sendFilters = async () => {
            try {
                const resp = await fetch('http://localhost:4000/api/paragraph', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(activeClass)
                });
                const data = await resp.json();
                showData(data);
                console.log("Response: ", data);
            } catch (err) {
                console.error(err);
            }
        };
        sendFilters();
    }, [activeClass.punctuation,activeClass.numbers,activeClass.words_list]);
    

    return (
        <>
            <div id="results_settings_container" className='container'>
                <div id="result_container">
                    <div>
                        <div id="results">
                            <span id="wpm_result">
                                <span>0&nbsp;</span>
                                <small>WPM</small>
                            </span>
                            <ul id="results_list">
                                <li>
                                    <span>Raw WPM</span>
                                    <span>25</span>
                                </li>
                                <li>
                                    <span>Accuracy</span>
                                    <span>-</span>
                                </li>
                                <li>
                                    <span>Correct Characters</span>
                                    <span>-</span>
                                </li>
                                <li>
                                    <span>Incorrect Characters</span>
                                    <span>30</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="settings_container">
                    <div id="settings_panel">
                        <ul id="settings_list">
                            <li>
                                <span>Test Duration</span>
                                <span>
                                    <span
                                        className={`filter_option ${activeClass.test_duration === '0:10' && 'active'}`}
                                        onClick={() => handleFilter('test_duration', '0:10')}
                                    >
                                        0:10
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.test_duration === '0:30' && 'active'}`}
                                        onClick={() => handleFilter('test_duration', '0:30')}
                                    >
                                        0:30
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.test_duration === '1:00' && 'active'}`}
                                        onClick={() => handleFilter('test_duration', '1:00')}
                                    >
                                        1:00
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Punctuation</span>
                                <span>
                                    <span
                                        className={`filter_option ${activeClass.punctuation === 'on' && 'active'}`}
                                        onClick={() => handleFilter('punctuation', 'on')}
                                    >
                                        On
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.punctuation === 'off' && 'active'}`}
                                        onClick={() => handleFilter('punctuation', 'off')}
                                    >
                                        Off
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Numbers</span>
                                <span>
                                    <span
                                        className={`filter_option ${activeClass.numbers === 'on' && 'active'}`}
                                        onClick={() => handleFilter('numbers', 'on')}
                                    >
                                        On
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.numbers === 'off' && 'active'}`}
                                        onClick={() => handleFilter('numbers', 'off')}
                                    >
                                        Off
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Words List</span>
                                <span>
                                    <span
                                        className={`filter_option ${activeClass.words_list === 'simple' && 'active'}`}
                                        onClick={() => handleFilter('words_list', 'simple')}
                                    >
                                        Simple
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.words_list === 'advanced' && 'active'}`}
                                        onClick={() => handleFilter('words_list', 'advanced')}
                                    >
                                        Advanced
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Show WPM</span>
                                <span>
                                    
                                    <span
                                        className={`filter_option ${activeClass.show_wpm === 'show' && 'active'}`}
                                        onClick={() => handleFilter('show_wpm', 'show','on')}
                                    >
                                        Show
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.show_wpm === 'hide' && 'active'}`}
                                        onClick={()=>{
                                            handleFilter('show_wpm', 'hide','off')
                                        }}
                                    >
                                        Hide
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Show Timer</span>
                                <span>
                                    <span
                                        className={`filter_option ${activeClass.show_timer === 'show' && 'active'}`}
                                        onClick={() => handleFilter('show_timer', 'show' ,'', 'on')}
                                    >
                                        Show
                                    </span>
                                    <span
                                        className={`filter_option ${activeClass.show_timer === 'hide' && 'active'}`}
                                        onClick={() => handleFilter('show_timer', 'hide' ,'', 'off')}
                                    >
                                        Hide
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resultcontainer;
