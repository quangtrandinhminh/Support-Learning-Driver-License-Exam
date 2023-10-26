import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import PracticeRegisterTemplate from '../../templates/practice-register-template/practice-list'

function PracticeRegisterPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <PracticeRegisterTemplate />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default PracticeRegisterPage