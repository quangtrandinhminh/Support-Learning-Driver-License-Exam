import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import UpdateInformationTemplate from '../../templates/update-information/update-information'

function UpdateInformationPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>

            <body>
                <UpdateInformationTemplate />
            </body>

            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default UpdateInformationPage