import GuestFooter from '../../organisms/guest-footer/guest-footer'
import GuestHeaderHome from '../../organisms/guest-header-home/guest-header-home'
import HomeTemplate from '../../templates/guest-home-template/home-template'
import '../general.scss'

function GuestHomePage() {
    return (
        <>
            <div>
                <header>
                    <GuestHeaderHome />
                </header>
                <body>
                    <HomeTemplate />
                </body>
                <footer>
                    <GuestFooter />
                </footer>
            </div>
        </>
    )
}

export default GuestHomePage