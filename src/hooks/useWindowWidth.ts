import { useState, useEffect } from 'react'; // State stores browser width; effect manages the browser event subscription.

export function useWindowWidth() { // Custom hooks package reusable stateful behavior for multiple components.
    const [width, setWidth] = useState<number>(window.innerWidth); // Initializes state from the current viewport width.
    useEffect(() => { // Connects the React component lifecycle to a browser API.
        const handleResize = () => setWidth(window.innerWidth); // Copies each new width into state to trigger a render.
        window.addEventListener('resize', handleResize); // Subscribes once after the component mounts.
        return () => window.removeEventListener('resize', handleResize); // Prevents leaked/duplicate listeners on unmount.
    }, []); // Empty dependencies mean one subscription per mount.
    return width; // Lets any consuming component display the reactive width.
}
