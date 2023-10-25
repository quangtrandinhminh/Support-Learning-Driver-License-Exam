import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import MentorInformationTemplate from '../../templates/mentor-inf-template/mentor-inf'

function MentorInformationPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <MentorInformationTemplate />
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MentorInformationPage