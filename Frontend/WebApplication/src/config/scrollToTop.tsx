import { useEffect } from 'react';

function ScrollToTop() {

    useEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scroll( {
            top: 0,
            behavior: 'instant'
        });
    }, []);

    return null; // This component doesn't render anything
}

export default ScrollToTop;