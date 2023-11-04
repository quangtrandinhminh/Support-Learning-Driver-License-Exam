import React from 'react'
import './theory-test.scss'
import Countdown from "react-countdown";
import { AiFillClockCircle } from 'react-icons/ai'

function TheoryTestPaper() {

    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdownconst formattedMinutes = String(minutes).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");
            const formattedSeconds = String(seconds).padStart(2, "0");
            return (
                <span>
                    {formattedMinutes}:{formattedSeconds}
                </span>
            );
        }
    };

    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + 20);


    return (
        <div className='theory-paper-container'>
            <div className='theory-paper-title'>
                <h1 className='paper-title'>
                    Kỳ kiểm tra lý thuyết GPLX B2
                </h1>
            </div>
            <div className='theory-paper-box'>
                <table>
                    <thead>
                        <div className="question-number-container">
                            <div className='countdown-timer'>
                                <AiFillClockCircle className='clock-icon' /> Thời gian còn lại:<Countdown date={targetTime} renderer={renderer} />
                            </div>
                            <div className='top-line' />
                        </div>
                    </thead>
                    <tbody>
                        <div className='questions-circle'>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                                <li>8</li>
                            </ul>
                        </div>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default TheoryTestPaper