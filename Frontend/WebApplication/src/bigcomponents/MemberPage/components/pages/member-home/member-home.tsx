import MemberHeaderHome from '../../organisms/member-header-home/member-header'
import HomeTemplate from '../../templates/member-home-template/home-template'
import MemberFooter from '../../organisms/member-footer/member-footer'
import { toast } from 'react-toast'

function MemberHomePage() {
    return (
        <>
            <header id='header-nav'>
                <MemberHeaderHome />
            </header>
            <div className='body-container'>
                <HomeTemplate />
            </div>
            <footer className='home-footer'>
                <MemberFooter />
            </footer>
        </>
    )
}

export default MemberHomePage
