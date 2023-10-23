import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import PracticeScheduleTemplate from '../../templates/pratice-schedule-template/pratice-schedule'

function PracticeSchedulePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <PracticeScheduleTemplate />
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default PracticeSchedulePage