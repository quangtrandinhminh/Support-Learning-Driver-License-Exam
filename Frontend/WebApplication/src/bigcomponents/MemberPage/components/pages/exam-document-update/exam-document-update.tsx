import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import ExamDocumentUpdateTemplate from '../../templates/exam-document-template/exam-document-update'

function ExamDocumentUpdatePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <ExamDocumentUpdateTemplate />
            </body>
            <footer className='exam-document-update-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default ExamDocumentUpdatePage