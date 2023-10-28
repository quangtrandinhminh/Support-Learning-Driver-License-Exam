import { Outlet } from 'react-router-dom'
import './staff-general.scss'
import StaffSidebar from './organisms/header/header'

function StaffLayout() {
    return (
        <div className='page-container'>
            <div className='staff-header'>
                <StaffSidebar />
            </div>
            <div className='staff-body'>
                <Outlet />
            </div>
        </div>
    )
}

export default StaffLayout