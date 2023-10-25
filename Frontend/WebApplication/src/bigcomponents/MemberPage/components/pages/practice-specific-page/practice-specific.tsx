import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import PracticeSpecificTemplate from '../../templates/practice-specific-template/practice-specific'

function PracticeSpecificPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <PracticeSpecificTemplate />
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default PracticeSpecificPage