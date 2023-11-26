import React, { useEffect, useState } from 'react';
import './theory-test.scss';
import Countdown from "react-countdown";
import { AiFillClockCircle } from 'react-icons/ai';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../../../../config/axios';

function TheoryTestPaper() {
    const member = sessionStorage.getItem("loginedMember") ? JSON.parse(sessionStorage.getItem("loginedMember")) : null;

    const [start, setStart] = useState(false);
    const [question, setQuestion] = useState([]);
    const [student, setStudent] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState(new Array(36).fill(0));
    const [answeredQuestions, setAnsweredQuestions] = useState(new Array(36).fill(false));[1, 2, 3, 4, 1, 4, 2,]
    const [targetTime, setTargetTime] = useState(0);
    const navigate = useNavigate();

    // Random component
    const Completionist = () => <span className='tw-text-uppercase'></span>;

    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            const formattedMinutes = String(minutes).padStart(2, "0");
            const formattedSeconds = String(seconds).padStart(2, "0");
            return (
                <span>
                    {formattedMinutes}:{formattedSeconds}
                </span>
            );
        }
    };

    const getStudentByMemberID = async () => {
        try {
            const response = await api.get(`Student/${member.memberID}`);
            setStudent(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let answerStrings = answer.map(num => num.toString()); // return array of integer to string
            let answerJSON = JSON.stringify(answerStrings);

            const response = await api.put('CheckStudentAnswer', answerJSON, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            toast.success('Nộp bài thành công!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
            localStorage.setItem('studentAnswer', JSON.stringify(response.data));
            navigate('/kiem-tra/ket-qua');
        } catch (error) {
            console.log(error);
        }
    }

    const handleStart = () => {
        if (!start) {
            setStart(true);
        }
    }

    const getExam = async () => {
        try {
            const response = await api.get(`GetStudentQuestion/${student.studentId}`);
            setQuestion(response.data);
            const updatedAnswer = [...answer];
            updatedAnswer[35] = student.studentId.toString();
            setAnswer(updatedAnswer);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStudentByMemberID();
    }, [])

    useEffect(() => {
        getExam();
    }, [student])

    useEffect(() => {
        let minutes = new Date();
        setTargetTime(minutes.setMinutes(minutes.getMinutes() + 20));
    }, [start]);

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            setCurrentQuestionIndex(34); // Changed this to 35
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < question.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(0);
        }
    };

    const handleAnswerSelection = (selectedOption) => {
        const updatedAnswer = [...answer];
        updatedAnswer[currentQuestionIndex] = selectedOption;
        setAnswer(updatedAnswer);

        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = true;
        setAnsweredQuestions(updatedAnsweredQuestions);
    };

    return (
        <div className='theory-paper-container'>
            <div className='theory-paper-title'>
                <h1 className='paper-title'>
                    Kỳ kiểm tra lý thuyết GPLX B2
                </h1>
            </div>
            {
                !start ? (
                    <div className='start-btn tw-text-center tw-mt-10'>
                        <Button onClick={handleStart}>Bắt đầu làm bài</Button>
                    </div>
                ) : null
            }
            <div className='theory-paper-box'>
                <form action="" id='theory-paper-form' onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <div className="question-number-container">
                                <div className='countdown-timer'>
                                    {
                                        start ? (
                                            <>
                                                <AiFillClockCircle className='clock-icon' /> Thời gian còn lại: <Countdown date={targetTime} renderer={renderer} />
                                            </>
                                        ) : (
                                            <>
                                                <AiFillClockCircle className='clock-icon' /> Thời gian còn lại:  20:00
                                            </>
                                        )
                                    }
                                </div>
                                <div className='top-line' />
                            </div>
                        </thead>
                        <tbody>
                            <div className='questions-circle'>
                                <ul>
                                    {question.map((_, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setCurrentQuestionIndex(index)}
                                            className={answeredQuestions[index] ? 'answered' : ''}
                                        >
                                            {index + 1}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </tbody>
                    </table>
                    {
                        start && question && question.length > 0 ? (
                            <div className='question-content-container' key={question[currentQuestionIndex].questionId}>
                                <div className='content-box'>
                                    <div className='question-title'>
                                        <h4 className='question-num'>Câu hỏi {currentQuestionIndex + 1}:</h4>
                                    </div>
                                    <div className='tw-text-center img-container'>
                                        <img src={question[currentQuestionIndex].image} alt="" />
                                    </div>
                                </div>
                                <div className='answer-box'>
                                    <div className='answer'>
                                        <input
                                            type='radio'
                                            name={`answer-content-${currentQuestionIndex}`}
                                            value={1}
                                            checked={answer[currentQuestionIndex] === 1}
                                            onChange={() => handleAnswerSelection(1)}
                                        />
                                        1
                                    </div>
                                    <div className='answer'>
                                        <input
                                            type='radio'
                                            name={`answer-content-${currentQuestionIndex}`}
                                            value={2}
                                            checked={answer[currentQuestionIndex] === 2}
                                            onChange={() => handleAnswerSelection(2)}
                                        />
                                        2
                                    </div>
                                    <div className='answer'>
                                        <input
                                            type='radio'
                                            name={`answer-content-${currentQuestionIndex}`}
                                            value={3}
                                            checked={answer[currentQuestionIndex] === 3}
                                            onChange={() => handleAnswerSelection(3)}
                                        />
                                        3
                                    </div>
                                    <div className='answer'>
                                        <input
                                            type='radio'
                                            name={`answer-content-${currentQuestionIndex}`}
                                            value={4}
                                            checked={answer[currentQuestionIndex] === 4}
                                            onChange={() => handleAnswerSelection(4)}
                                        />
                                        4
                                    </div>
                                </div>
                                <div className='button-box'>
                                    <Button className='previous-btn' onClick={handlePreviousQuestion}>Câu trước</Button>
                                    <Button className='next-btn' onClick={handleNextQuestion}>Câu tiếp theo</Button>
                                </div>
                            </div>
                        ) : (
                            <div className='question-content-container'>
                                <div className='content-box'>
                                    <div className='question-title'></div>
                                    <div className='tw-text-center img-container'></div>
                                </div>
                            </div>
                        )
                    }
                    {
                        start ? (
                            <div className='submit-btn'>
                                <Button className='submit-btn' type='submit' form="theory-paper-form">Nộp bài thi</Button>
                            </div>
                        ) : null
                    }
                </form>
            </div>
        </div>
    )
}

export default TheoryTestPaper;
