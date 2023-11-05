import { useNavigate } from 'react-router-dom';
import './theory-paper-result.scss'
import Button from 'react-bootstrap/esm/Button'

function TheoryTestResult() {
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
                <form action="">
                    <div className='left-side'>
                        <div className='explanation-box'>
                            <ul className='explanation-list'>
                                <li className='tw-text-center'>
                                    <h4 className='tw-mb-6'>Kết quả làm bài</h4>
                                </li>
                                <li>
                                    <label htmlFor="">Đề số:</label>
                                    <span className='tw-text-green-600'> 01</span>
                                </li>
                                <li>
                                    <label htmlFor="">Số câu đúng:</label>
                                    <span className='tw-text-red-600'> xx</span>
                                </li>
                                <li>
                                    <label htmlFor="">Số câu sai:</label>
                                    <span className='tw-text-red-600'> xx</span>
                                </li>
                                <li>
                                    <label htmlFor="">Kết quả:</label>
                                    <span className='tw-text-red-600'> ĐẠT/KHÔNG ĐẠT</span>
                                </li>
                                <li>
                                    <label htmlFor="">Đáp án sai:</label>
                                    <span className='tw-text-red-600'> Tô màu đỏ</span>
                                </li>
                                <li>
                                    <label htmlFor="">Đúng án đúng:</label>
                                    <span className='tw-text-green-600'> Tô màu xanh</span>
                                </li>
                                <li>
                                    <label htmlFor="" className='fw-bold tw-italic'>Kiểm tra lại đáp án bên dưới!</label>
                                </li>
                            </ul>
                        </div>
                        <table>
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
                    </div>
                    <div className='question-content-container'>
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
                            <div className='answer-explanation'>
                                <p>Giải thích: </p> 
                            </div>
                        </div>
                        <div className='button-box'>
                            <Button className='previous-btn'>Câu trước</Button>
                            <Button className='next-btn'>Câu tiếp theo</Button>
                        </div>
                        <div className='back-btn tw-text-center tw-mt-10'>
                            <Button className='back-btn' onClick={handleBack}>Trang chủ</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TheoryTestResult