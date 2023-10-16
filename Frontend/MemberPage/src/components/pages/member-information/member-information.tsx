import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import MemberInformationTemplate from '../../templates/member-information-template/member-information-template'

function MemberInformation() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>

            <body>
                <MemberInformationTemplate />
            </body>

            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MemberInformation