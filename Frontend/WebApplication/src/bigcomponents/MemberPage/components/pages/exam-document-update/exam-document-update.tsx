import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import ExamDocumentUpdateTemplate from '../../templates/exam-document-template/exam-document-update'

function ExamDocumentUpdatePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <ExamDocumentUpdateTemplate />
            </div>
            <footer className='exam-document-update-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default ExamDocumentUpdatePage