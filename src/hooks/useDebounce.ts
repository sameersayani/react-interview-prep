import { useState, useEffect } from "react"; // Hooks let this utility retain a value and synchronize a timer.

export function useDebounce<T>(value: T, delay: number): T { // A generic custom hook delays rapidly changing values of any type.
    const [debouncedValue, setDebouncedValue] = useState<T>(value); // Exposes the last value that survived the delay.
    useEffect(() => { // Restarts the waiting period whenever the input value or delay changes.
        const handler = setTimeout(() => { // Schedules a trailing update instead of updating immediately.
            setDebouncedValue(value); // Causes consumers to re-render with the settled value.
        }, delay); // Uses the caller-provided quiet period in milliseconds.

        return () => { // React runs cleanup before the next effect and on unmount.
            clearTimeout(handler); // Cancels stale work so only the newest value wins.
        };
    }, [value, delay]); // Dependency array keeps the effect synchronized with both inputs.

    return debouncedValue; // Gives the component the rate-limited value.
}
