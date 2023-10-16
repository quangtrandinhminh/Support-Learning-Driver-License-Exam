import Information from '../../molecules/center-information/center-information'
import AboutCenter from '../../molecules/center-introduction/center-introduction'
import Course from '../../molecules/course/course'

function HomeTemplate() {
    return (
        <>
            <AboutCenter />
            <Course />
            <Information />
        </>
    )
}

export default HomeTemplate