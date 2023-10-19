import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import PracticeListTemplate from '../../templates/practice-list-template/practice-list'

function PracticeListPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <PracticeListTemplate />
            </body>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default PracticeListPage