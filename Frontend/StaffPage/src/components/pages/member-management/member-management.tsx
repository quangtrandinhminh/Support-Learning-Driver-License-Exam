import StaffSidebar from '../../organisms/header/header'
import MemberManagementTemplate from '../../templates/menber-management/member-management'

function MemberManagementPage() {
    return (
        <div className='page-container'>
            <header>
                <StaffSidebar />
            </header>
            <body>
                <MemberManagementTemplate />
            </body>
        </div>
    )
}

export default MemberManagementPage