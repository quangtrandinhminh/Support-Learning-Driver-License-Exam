import AboutCenter from '../../molecules/center-introduction/center-introduction'
import Course from '../../molecules/course-home/course'
import Information from '../../molecules/center-information/center-information'
import News from '../../molecules/news/news'

function HomeTemplate() {
    return (
        <div className='template'>
            <AboutCenter />
            <Course />
            <Information />
            <News />
        </div>
    )
}

export default HomeTemplate
