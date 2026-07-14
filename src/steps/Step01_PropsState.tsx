import { useState } from 'react' // Hook gives a function component local reactive state.

// Child component receives props (read only)
interface CounterDisplayProps { // TypeScript contract documents the child component's required props.
  count: number; // Parent supplies the read-only value to display.
  label: string; // Parent supplies descriptive text for that value.
}

function CounterDisplay({ count, label }: CounterDisplayProps) { // Destructures typed props passed from the parent.
  // count ++ will not work here because props are read only
  return (
    <p>
      {label}: <strong>{count}</strong> {/* JSX expressions render current prop values. */}
    </p>
  )
}


// Parent component owns its state and passes it down to child component
function Step01_PropsState() { // Parent component owns the source of truth.
  const [count, setCount] = useState<number>(0); // Creates numeric state and its setter, initially zero.

  const increment = () => setCount((prev) => prev + 1); // Functional update calculates next state from the latest queued value.
  const decrement = () => setCount((prev) => prev - 1); // Updating state schedules a parent and child re-render.

  return (
    <div style ={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h2>Props vs State demo</h2>
      {/* Passing state down to child component as props */}
      <CounterDisplay count={count} label="Current Count" /> {/* One-way data flow sends parent state down as props. */}
      <button onClick={increment}>+</button> {/* React calls this handler on a click. */}
      <button onClick={decrement} style={{ marginLeft: '0.5rem' }}>-</button> {/* Event updates the same state in the opposite direction. */}
    </div>
  );
}

export default Step01_PropsState // Default export lets App import this demo under any local name.
