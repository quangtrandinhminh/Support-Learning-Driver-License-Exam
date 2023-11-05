import React from 'react'
import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import TheoryTestResult from '../../molecules/theory-paper-result/theory-paper-result'

function TheoryResultPage() {
    return (
        <>

            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <TheoryTestResult />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default TheoryResultPage