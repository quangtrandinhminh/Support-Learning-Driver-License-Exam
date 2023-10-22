import StaffHeader from '../../organisms/header/header'
import MemberManagement from '../../templates/menber-management/member-management'
import MentorManagementTemplate from '../../templates/mentor-management/mentor-management'

function MentorMamagementPage() {
    return (
        <>
            <header>
                <StaffHeader />
            </header>
            <body>
                <MentorManagementTemplate />
            </body>
        </>
    )
}

export default MentorMamagementPage