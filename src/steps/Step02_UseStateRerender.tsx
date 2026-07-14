import { useState } from 'react'; // Provides local state that triggers renders when updated.

export default function Step02_UseStateRerender() { // Demonstrates React state batching and stale closures.
  const [count, setCount] = useState<number>(0); // Current render receives a snapshot of numeric state.

  // BUGGY version: stale closure problem
  const brokenIncrementTwice = () => { // This handler closes over one render's `count` snapshot.
    setCount(count + 1); // Queues the same computed value as the next line.
    setCount(count + 1); // Does not see the prior queued update, so the two calls collapse to +1.
    // Both reads use the SAME stale `count` from this render.
    // Result: count only goes up by 1, not 2.
  };

  // FIXED version: functional updater
  const correctIncrementTwice = () => { // Functional setters compose correctly inside React's update queue.
    setCount((prev) => prev + 1); // React passes this updater the latest queued value.
    setCount((prev) => prev + 1); // Receives the result of the first updater, producing +2.
    // Each call gets the latest queued value.
    // Result: count goes up by 2.
  };

  return (
    <div>
      <h2>Step 2: useState & Re-renders Demo</h2>
      <p>
        Count: <strong>{count}</strong> {/* Reading state in JSX keeps the UI synchronized after renders. */}
      </p>

      <button onClick={brokenIncrementTwice}> {/* Passes a function reference; React calls it only when clicked. */}
        Broken: +2 (stale closure)
      </button>
      <button onClick={correctIncrementTwice} style={{ marginLeft: '0.5rem' }}> {/* Demonstrates the safe update pattern. */}
        Fixed: +2 (functional update)
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '0.5rem' }}> {/* Inline handler resets state to its initial value. */}
        Reset
      </button>
    </div>
  );
}
