import Information from '../../molecules/center-information/center-information'
import AboutCenter from '../../molecules/center-introduction/center-introduction'
import Consultation from '../../molecules/consultation/consultation'
import Course from '../../molecules/course/course'
import News from '../../molecules/news/news'

function HomeTemplate() {
    return (
        <>
            <div className='template'>
                <AboutCenter />
                <Course />
                <Information />
                <News />
                <Consultation />
            </div>
        </>
    )
}

export default HomeTemplate