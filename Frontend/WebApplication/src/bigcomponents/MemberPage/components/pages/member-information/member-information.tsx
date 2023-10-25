import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import MemberInformationTemplate from '../../templates/member-information-template/member-information-template'

function MemberInformationPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <MemberInformationTemplate />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MemberInformationPage