import React from 'react'
import StaffHeader from '../../organisms/header/header'
import MemberManagementTemplate from '../../templates/menber-management/member-management'

function MemberManagementPage() {
    return (
        <>
            <header>
                <StaffHeader />
            </header>
            <body>
                <MemberManagementTemplate />
            </body>
        </>
    )
}

export default MemberManagementPage