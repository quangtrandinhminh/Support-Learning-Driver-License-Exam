import React from 'react'
import './create-course-form.scss'

function CreateCourseForm() {
  return (
    <div className='create-course-container'>
      <div className='create-course-title'>
        <h1 className='text-center text-uppercase'>Tạo khoá học</h1>
      </div>
      <div className='create-course-form'>
        <form action="">
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">ID: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="courseID" />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">Name: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="name" />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">Start date: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="start date" />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">End date: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="end date" />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">Limit student: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="limit student" />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">Course month: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="course month" />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor="courseID" className="col-sm-2 col-form-label">Course year: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseID" placeholder="course year" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourseForm