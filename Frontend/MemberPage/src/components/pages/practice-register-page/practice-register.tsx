import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import PracticeRegisterTemplate from '../../templates/practice-register-template/practice-list'

function PracticeRegisterPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <PracticeRegisterTemplate />
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default PracticeRegisterPage