import React from 'react'
import StaffPage from '../home/home-page'
import NewsManagemeneTemplate from '../../templates/news-management/news-management'

function NewsManagementPage() {
    return (
        <div className="page-container">
            <div className="staff-header">
                <StaffPage />
            </div>
            <div className='staff-body'>
                <NewsManagemeneTemplate />
            </div>
        </div>
    )
}

export default NewsManagementPage