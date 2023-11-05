import React, { useEffect, useState } from 'react'
import './theory-test.scss'
import Countdown from "react-countdown";
import { AiFillClockCircle } from 'react-icons/ai'
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function TheoryTestPaper() {
    const [start, setStart] = useState(false);
    const navigate = useNavigate();

    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a cosuntdownconst formattedMinutes = String(minutes).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");
            const formattedSeconds = String(seconds).padStart(2, "0");
            return (
                <span>
                    {formattedMinutes}:{formattedSeconds}
                </span>
            )
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/kiem-tra/ket-qua')
        toast.success('Nộp bài thành công!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
        })
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }

    const handleStart = () => {
        if (!start) {
            setStart(true);
        }
    }

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault(); // This will show a confirmation dialog to the user.
            e.returnValue = 'Bạn có muốn tải lại trang?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + 20);

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
                                                <AiFillClockCircle className='clock-icon' /> Thời gian còn lại:<Countdown date={targetTime} renderer={renderer} />
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
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                    <li>6</li>
                                    <li>7</li>
                                    <li>8</li>
                                    <li>9</li>
                                    <li>10</li>
                                    <li>11</li>
                                    <li>12</li>
                                    <li>13</li>
                                    <li>14</li>
                                    <li>15</li>
                                    <li>16</li>
                                    <li>17</li>
                                    <li>18</li>
                                    <li>19</li>
                                    <li>20</li>
                                    <li>21</li>
                                    <li>22</li>
                                    <li>23</li>
                                    <li>24</li>
                                    <li>25</li>
                                    <li>26</li>
                                    <li>27</li>
                                    <li>28</li>
                                    <li>29</li>
                                    <li>30</li>
                                    <li>31</li>
                                    <li>32</li>
                                    <li>33</li>
                                    <li>34</li>
                                    <li>35</li>
                                </ul>
                            </div>
                        </tbody>
                    </table>
                    <div className='question-content-container'>
                        {
                            start ? (
                                <>
                                    <div className='content-box'>
                                        <div className='question-title'>
                                            <h4 className='question-num'>Câu hỏi 1:</h4>
                                            <h6 className='question-notice'>Câu hỏi liệt</h6>
                                        </div>

                                        <h5 className='question-content'>Người lái xe máy không được vượt xe khác khi gặp trường
                                            hợp nào ghi ở dưới đây?
                                        </h5>
                                    </div>
                                    <div className='answer-box'>
                                        <div className='answer'>
                                            <input type='radio' name='answer-content' />
                                            1- Trên cầu hẹp có một làn xe.
                                            Nơi đường giao nhau, đường bộ giao nhau, cùng mức với đường sắt;
                                            xe được quyền ưu tiên đang phát tín hiệu ưu tiên khi làm nhiệm vụ.
                                        </div>
                                        <div className='answer'>
                                            <input type='radio' name='answer-content' />
                                            2 - Trên cầu có từ 02 làn xe trở lên; nơi có đường bộ giao nhau không cùng mức với đường sắt;
                                            xe được quyền ưu tiên đang đi phía trước nhưng không phát tín hiệu ưu tiên.
                                        </div>
                                        <div className='answer'>
                                            <input type='radio' name='answer-content' />
                                            3 - Trên đường có 2 làn đường được phân chia làn bằng vạch kẻ nét đứt
                                        </div>
                                    </div>
                                    <div className='button-box'>
                                        <Button className='previous-btn'>Câu trước</Button>
                                        <Button className='next-btn'>Câu tiếp theo</Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='content-box'>
                                        <div className='question-title'>
                                            <h4 className='question-num'>Câu hỏi:</h4>
                                        </div>

                                        <h5 className='question-content'></h5>
                                    </div>
                                    <div className='answer-box'>
                                        <div className='answer'>
                                        </div>
                                        <div className='answer'>
                                        </div>
                                        <div className='answer'>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
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

export default TheoryTestPaper