import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../../../../config/axios';
import { toast } from 'react-toastify';
import './create-exam.scss'

function CreateExam() {
    const user = JSON.parse(sessionStorage.getItem('loginedUser')) ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    console.log(user);
    const [courseId, setCourseId] = useState([]);
    const [error, setError] = useState(null);
    const [staff, setStaff] = useState(null);
    const [inputData, setInputData] = useState({
        staffId: "",
        courseId: "",
        examName: "",
        examTime: "",
        description: "",
        duration: 22,
        limitQuestion: 35,
        limitKeyQuestion: 3,
        minimumCorrectAnswer: 32,
        status: true
    });
    const namePattern = /^[\p{L} ]{5,32}$/u;
    const navigate = useNavigate();

    const getStaffByUID = async () => {
        try {
            const response = await api.get(`Staff/user/` + user.userID);
            setStaff(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createNewExam = async () => {
        try {
            if (!namePattern.test(inputData.examName)) {
                setError('Tên kỳ thi không đúng. Vui lòng nhập lại!');
                return;
            }

            await api.post('Exam/add', inputData);
            toast.success("Tạo kỳ thi thành công");
            setError(null);
            navigate('/quan-ly-ky-thi');

        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
                return;
            }
        }
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
    }

    const getCourseList = async () => {
        try {
            const response = await api.get('Course/list');
            const res = response.data;
            let courseId = res.map(course => course.courseId);
            setCourseId(courseId);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createNewExam()
    }

    useEffect(() => {
        getCourseList();
    }, [])

    useEffect(() => {
        getStaffByUID();
    }, [])

    // Update staffId in inputData when staff state is updated
    useEffect(() => {
        if (staff) {
            setInputData((prevInputData) => ({
                ...prevInputData,
                staffId: staff.staffId,
            }));
        }
    }, [staff]);

    return (
        <div className='create-exam-container'>
            <div className='create-exam-title'>
                <h1 className='text-center text-uppercase'>Tạo kỳ thi</h1>
            </div>
            <div className='create-exam-form'>
                {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
                <form onSubmit={handleSubmit}>
                    <div className='form-group row'>
                        <label htmlFor="courseId" className="col-sm-3 col-form-label">Mã khoá học: </label>
                        <div className="col-sm-9">
                            <select
                                className="form-control"
                                id="courseId"
                                placeholder="courseId"
                                name='courseId'
                                value={inputData.courseId || ''}  // Ensure that it's not undefined
                                onChange={e => setInputData({ ...inputData, courseId: e.target.value })}
                            >
                                <option value="" disabled>Chọn khoá học</option>
                                {
                                    courseId.map((course, index) => (
                                        <option key={index} value={course}>{course}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="name" className="col-sm-3 col-form-label">Tên kỳ thi: </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="name" placeholder="tên kỳ thi"
                                name='name'
                                value={inputData.examName}
                                onChange={e => setInputData({ ...inputData, examName: e.target.value })} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="startDate" className="col-sm-3 col-form-label">Thời gian: </label>
                        <div className="col-sm-9">
                            <input type="date" className="form-control" id="startDate"
                                name='startDate'
                                value={inputData.examTime}
                                onChange={e => setInputData({ ...inputData, examTime: e.target.value })} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="description" className="col-sm-3 col-form-label">Mô tả: </label>
                        <div className="col-sm-9">
                            <textarea className="form-control tw-h-28" id="description" placeholder="mô tả"
                                name='description' onChange={e => setInputData({ ...inputData, description: e.target.value })} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="examDuration" className="col-sm-3 col-form-label">Thời gian thi: </label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control" id="examDuration"
                                name='examDuration' value={inputData.duration} disabled />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="limitQuestion" className="col-sm-3 col-form-label">Số lượng câu hỏi: </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="limitQuestion"
                                name='limitQuestion' value={inputData.limitQuestion} disabled />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="limitKeyQuestion" className="col-sm-3 col-form-label">Số lượng câu hỏi liệt: </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="limitKeyQuestion"
                                name='limitKeyQuestion' value={inputData.limitKeyQuestion} disabled />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="minimumCorrectAnswer" className="col-sm-3 col-form-label">Số lượng câu đúng tối hiểu: </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="minimumCorrectAnswer"
                                name='minimumCorrectAnswer' value={inputData.minimumCorrectAnswer} disabled />
                        </div>
                    </div>
                    <button className='btn btn-primary w-20 justify-self-end' type='submit'>Tạo</button>
                </form>
            </div>
        </div>
    )
}

export default CreateExam
