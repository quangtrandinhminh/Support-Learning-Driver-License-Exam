import StaffSidebar from '../../organisms/header/header'
import MemberManagementTemplate from '../../templates/menber-management/member-management'

function MemberManagementPage() {
    return (
        <div className='page-container'>
            <div className='staff-header'>
                <StaffSidebar />
            </div>
            <div className='staff-body'>
                <MemberManagementTemplate />
            </div>
        </div>
    )
}

export default MemberManagementPage