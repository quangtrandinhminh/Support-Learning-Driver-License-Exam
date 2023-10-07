import MemberFooter from '../../organisms/member-footer/member-footer'
import 'F:/Study/Github_Project/Support-Learning-Driver-License-Exam/Frontend/MemberPage/src/components/pages/general.scss'
import MemberHeader from '../../organisms/member-header/member-header'
import HomeTemplate from '../../templates/member-home-template/home-template'

function MemberHomePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <HomeTemplate/>
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MemberHomePage
