import React from 'react'
import StaffPage from '../home/home-page'
import StaffSidebar from '../../organisms/header/header'
import CreateNewsTemplate from '../../templates/create-news/create-news'

function CreateNewsPage() {
    return (
        <div className="page-container">
            <div className='staff-header'>
                <StaffSidebar />
            </div>
            <div className="staff-body">
                <CreateNewsTemplate />
            </div>
        </div>
    )
}

export default CreateNewsPage