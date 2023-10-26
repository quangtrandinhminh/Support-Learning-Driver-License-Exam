import StaffSidebar from '../../organisms/header/header'
import UserManagementTemplate from '../../templates/user-management/user-management'

function UserManagementPage() {
    return (
        <div className="page-container">
            <div className='staff-header'>
                <StaffSidebar />
            </div>
            <div className='staff-body'>
                <UserManagementTemplate />
            </div>
        </div>
    )
}

export default UserManagementPage