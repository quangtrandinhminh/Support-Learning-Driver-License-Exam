import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import MentorInformationTemplate from '../../templates/mentor-inf-template/mentor-inf'

function MentorInformationPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <MentorInformationTemplate />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MentorInformationPage