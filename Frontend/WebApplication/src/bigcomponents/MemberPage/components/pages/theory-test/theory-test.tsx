import React from 'react'
import MemberHeader from '../../organisms/member-header/member-header'
import MemberFooter from '../../organisms/member-footer/member-footer'
import TheoryTestTemplate from '../../templates/theory-test/theory-test'

function TheoryTestPage() {
    return (
        <>
            <header>
                <MemberHeader />
            </header>
            <div className='body-container'>
                <TheoryTestTemplate />
            </div>
            <footer>
                <MemberFooter />
            </footer>
        </>
    )
}

export default TheoryTestPage