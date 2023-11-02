import React, { useState } from 'react'
import './create-course-form.scss'
import api from '../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateCourseForm() {
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState({
    courseId: '',
    name: '',
    startDate: '',
    endDate: '',
    numberOfStudents: 0,
    limitStudent: 0,
    status: false
  });

  const navigate = useNavigate();

  const createNewCourse = async () => {
    try {
      if (!/^(\d{4})B2$/.test(inputData.courseId)) {
        setError('Mã khoá học phải có định dạng XXXXB2 với X là số.');
        return;
      } else if (!/^(\d{3})B2$/.test(inputData.name)) {
        setError('Tên khoá học phải có định dạng XXXB2 với X là số.');
        return;
      }

      await api.post('Course/add', inputData);
      toast.success("Tạo khoá học thành công");
      setError(null);
      navigate('/quan-ly-khoa-hoc');

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
    window.scrollTo(0, 0);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewCourse()
  }

  return (
    <div className='create-course-container'>
      <div className='create-course-title'>
        <h1 className='text-center text-uppercase'>Tạo khoá học</h1>
      </div>
      <div className='create-course-form'>
        {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className='form-group row'>
            <label htmlFor="courseId" className="col-sm-3 col-form-label">Mã khoá học: </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="courseId" placeholder="courseId"
                name='courseId'
                value={inputData.courseId}
                onChange={e => setInputData({ ...inputData, courseId: e.target.value })} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="name" className="col-sm-3 col-form-label">Tên khoá học: </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="name" placeholder="name"
                name='name'
                value={inputData.name}
                onChange={e => setInputData({ ...inputData, name: e.target.value })} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="startDate" className="col-sm-3 col-form-label">Ngày khai giảng: </label>
            <div className="col-sm-9">
              <input type="date" className="form-control" id="startDate" placeholder="start date"
                name='startDate'
                value={inputData.startDate}
                onChange={e => setInputData({ ...inputData, startDate: e.target.value })} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="endDate" className="col-sm-3 col-form-label">Ngày bế giảng: </label>
            <div className="col-sm-9">
              <input type="date" className="form-control" id="endDate" placeholder="end date"
                name='endDate'
                value={inputData.endDate}
                onChange={e => setInputData({ ...inputData, endDate: e.target.value })} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="limitStudent" className="col-sm-3 col-form-label">Số học viên tối đa: </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="limitStudent"
                name='limitStudent'
                value={0}
                disabled />
            </div>
          </div>
          <button className='btn btn-primary w-20 justify-self-end' type='submit'>Tạo</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourseForm