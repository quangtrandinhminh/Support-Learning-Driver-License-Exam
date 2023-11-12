import { useNavigate } from 'react-router-dom';
import './theory-paper-result.scss'
import Button from 'react-bootstrap/esm/Button'

function TheoryTestResult() {
    const studentAswer = localStorage.getItem('studentAnswer') ? JSON.parse(localStorage.getItem('studentAnswer')) : null;
    console.log(studentAswer);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }
    return (
        <div className='theory-result-container'>
            <div className='theory-result-title'>
                <h1 className='result-title'>
                    Kết quả Kỳ kiểm tra lý thuyết GPLX B2
                </h1>
            </div>
            <div className='theory-result-box'>
                <div className='left-side'>
                    <div className='explanation-box'>
                        <ul className='explanation-list'>
                            <li className='tw-text-center'>
                                <h4 className='tw-mb-6'>Kết quả làm bài</h4>
                            </li>
                            <li>
                                <label htmlFor="">Số câu đúng:</label>
                                <span className='tw-text-green-600'> {studentAswer.numberOfCorrectAnswer}</span>
                            </li>
                            <li>
                                <label htmlFor="">Số câu sai:</label>
                                <span className='tw-text-realRed'> {35 - studentAswer.numberOfCorrectAnswer}</span>
                            </li>
                            <li>
                                <label htmlFor="">Số câu đểm liệt sai:</label>
                                <span className='tw-text-realRed'> {studentAswer.numberOfWrongKeyQuestion}</span>
                            </li>
                            <li>
                                <label htmlFor="">Kết quả:</label>
                                <span className={`${studentAswer.result == "Not Pass" ? 'result-fail' : 'result-pass'}`}>
                                    {studentAswer.result == "Not Pass" ? ' KHÔNG ĐẠT' : ' ĐẠT'}
                                </span>
                            </li>
                            {
                                studentAswer.result == "Not Pass" ? (
                                    <li>
                                        <span><i>Kết quả của bạn không đạt, bạn cần đợi đợt thi lý thuyết tiếp theo!</i></span>
                                    </li>
                                ) : (
                                    null
                                )
                            }
                        </ul>
                    </div>
                    <div className='back-btn tw-text-center tw-mt-10'>
                        <Button className='back-btn' onClick={handleBack}>Trang chủ</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheoryTestResult