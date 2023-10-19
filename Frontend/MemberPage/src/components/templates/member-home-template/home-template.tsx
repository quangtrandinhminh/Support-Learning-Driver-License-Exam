import AboutCenter from '../../molecules/center-introduction/center-introduction'
import Course from '../../molecules/course-home/course'
import Information from '../../molecules/center-information/center-information'
import News from '../../molecules/news/news'

function HomeTemplate() {
    return (
        <>
            <AboutCenter />
            <Course />
            <Information />
            <News />
        </>
    )
}

export default HomeTemplate
