import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import TheoryScheduleTemplate from '../../templates/theory-schedule-template/theory-schedule'
import ScrollToTop from '../../../../../config/scrollToTop'
import { useEffect } from 'react'

function TheorySchedulePage() {

    return (
        <>
            <ScrollToTop />
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <TheoryScheduleTemplate />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default TheorySchedulePage