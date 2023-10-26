import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import PracticeScheduleTemplate from '../../templates/pratice-schedule-template/pratice-schedule'

function PracticeSchedulePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <PracticeScheduleTemplate />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default PracticeSchedulePage