import '../general.scss'
import GuestHeaderHome from '../../organisms/guest-header-home/guest-header-home'
import HomeTemplate from '../../templates/guest-home-template/home-template'
import GuestFooter from '../../organisms/guest-footer/guest-footer'
import '/src/components/atoms/guest-nav-home/guest-nav-home.scss';

function GuestHomePage() {
    return (
        <>
            <div id='container'>
                <header id='header-nav'>
                    <GuestHeaderHome />
                </header>
                <body>
                    <HomeTemplate />
                </body>
                <footer className='home-footer'>
                    <GuestFooter />
                </footer>
            </div>
        </>
    )
}

export default GuestHomePage