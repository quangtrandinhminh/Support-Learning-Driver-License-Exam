import React from 'react'
import StaffSidebar from '../../organisms/header/header'
import MentorMamagementTemplate from '../../templates/mentor-management/mentor-management'

function MentorMamagementPage() {
    return (
        <div className="page-container">
            <div className="staff-header">
                <StaffSidebar />
            </div>
            <div className="staff-body">
                <MentorMamagementTemplate />
            </div>
        </div>
    )
}

export default MentorMamagementPage