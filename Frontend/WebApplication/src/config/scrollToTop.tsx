import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {

    useEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo(0, 0);
    }, []);

    return null; // This component doesn't render anything
}

export default ScrollToTop;