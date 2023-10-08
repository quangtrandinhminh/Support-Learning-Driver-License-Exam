import MemberFooter from '../../organisms/member-footer/member-footer'
import '../general.scss'
import MemberHeader from '../../organisms/member-header/member-header'
import HomeTemplate from '../../templates/member-home-template/home-template'

function MemberHomePage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <body>
                <HomeTemplate />
            </body>
            <footer className='home-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MemberHomePage
