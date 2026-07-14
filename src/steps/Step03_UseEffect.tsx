import { useState, useEffect } from "react"; // State drives UI; effects synchronize it with timers/logging.

export default function Step03_UseEffect() { // Demonstrates effect setup, dependencies, and cleanup.
    const [seconds, setSeconds] = useState<number>(0); // Stores elapsed seconds displayed by JSX.
    const [isRunning, setIsRunning] = useState<boolean>(false); // Controls whether the external interval exists.

    useEffect(() => { // Synchronizes the timer whenever `isRunning` changes.
        let interval: ReturnType<typeof setInterval> | null = null; // Stores the timer handle for cleanup with browser-safe typing.
        if (isRunning) { // Starts side effects only while the user wants the timer running.
            interval = setInterval(() => { // Schedules repeated state updates.
                setSeconds((prev) => prev + 1); // Functional update avoids a stale seconds closure.
            }); // With no delay argument, this runs as quickly as the event loop allows (despite the `seconds` name).
        }
        return () => { // Runs before dependency changes and when the component unmounts.
            if (interval) clearInterval(interval); // Prevents duplicate timers and memory leaks.
        }
    }, [isRunning]); // Rebuilds the timer only when its on/off control changes.

    useEffect(() => { // Demonstrates a mount effect (twice in development under StrictMode).
        console.log('Mounted! This should log only once.'); // Development observation; it does not affect rendered UI.
    }, []); // Empty dependencies mean no rerun after ordinary renders.
    return (
        <div>
            <h2>Step 3: useEffect Demo</h2>
            <p>
                Seconds: <strong>{seconds}</strong>
            </p>    
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)} style={{ marginLeft: '0.5rem' }}>Stop</button>
        <button onClick={() => setSeconds(0)} style={{ marginLeft: '0.5rem' }}>Reset</button>
        </div>
    );

}
