import React from 'react'
import StaffSidebar from '../../organisms/header/header'
import CreateCourseTemplate from '../../templates/create-course/create-course'

function CreateCoursePage() {
  return (
    <div className='page-container'>
      <div className="staff-header">
        <StaffSidebar />
      </div>
      <div className="staff-body">
        <CreateCourseTemplate />
      </div>
    </div>
  )
}

export default CreateCoursePage