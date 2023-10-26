import GuestFooter from '../../organisms/guest-footer/guest-footer'
import GuestHeaderHome from '../../organisms/guest-header-home/guest-header-home'
import HomeTemplate from '../../templates/guest-home-template/home-template'

function GuestHomePage() {
    return (
        <>
            <div>
                <header>
                    <GuestHeaderHome />
                </header>
                <div className='body-container'>
                    <HomeTemplate />
                </div>
                <footer>
                    <GuestFooter />
                </footer>
            </div>
        </>
    )
}

export default GuestHomePage