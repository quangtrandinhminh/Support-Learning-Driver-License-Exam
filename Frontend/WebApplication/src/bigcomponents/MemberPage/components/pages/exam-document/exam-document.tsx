import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import ExamDocumentTemplate from '../../templates/exam-document/exam-document'

function ExamDocumentPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <ExamDocumentTemplate />
            </div>
            <footer className='exam-document-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default ExamDocumentPage