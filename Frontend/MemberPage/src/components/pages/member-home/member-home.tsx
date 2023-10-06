import React from 'react'
import AboutCenter from '../../molecules/center-introduction/center-introduction'
import Course from '../../molecules/course/course'
import Information from '../../molecules/center-information/center-information'
import News from '../../molecules/news/news'

function MemberHomePage() {
    return (
        <>
            <AboutCenter />
            <Course />
            <Information />
            <News />
        </>
    )
}

export default MemberHomePage
