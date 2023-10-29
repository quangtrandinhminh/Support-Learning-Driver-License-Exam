import { Outlet } from 'react-router-dom'
import './components/mentor-general.scss'
import MentorSidebar from './components/atoms/mentor-home-sidebar/sidebar'

function MentorLayout() {
    return (
        <div className='page-container'>
            <div className='mentor-header'>
                <MentorSidebar />
            </div>
            <div className="mentor-body">
                <Outlet />
            </div>
        </div>
    )
}

export default MentorLayout