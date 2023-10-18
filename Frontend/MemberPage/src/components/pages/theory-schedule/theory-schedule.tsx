import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import TheoryScheduleTemplate from '../../templates/theory-schedule-template/theory-schedule'

function TheorySchedulePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <TheoryScheduleTemplate />
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default TheorySchedulePage