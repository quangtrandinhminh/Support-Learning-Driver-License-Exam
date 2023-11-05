import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import TheoryTestPaper from '../../molecules/theory-paper/theory-test'

function DoTheoryTestPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <TheoryTestPaper />
            </div>
            <footer className='exam-document-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default DoTheoryTestPage