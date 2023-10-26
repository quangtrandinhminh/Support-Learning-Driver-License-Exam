import React from 'react'
import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import ExamDocumentTemplate from '../../templates/exam-document/exam-document'

function ExamDocumentPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <ExamDocumentTemplate />
            </body>
            <footer className='exam-document-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default ExamDocumentPage