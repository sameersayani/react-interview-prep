import React, { useState } from "react";


// ============================================================
// Demo A — Typing children with React.ReactNode
// ============================================================
interface CardProps {
  title: string;
  children: React.ReactNode; // accepts strings, JSX, arrays, numbers, etc.
}

function Card({title, children }: CardProps){
    return(
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '0.5rem' }}>
        <h4 style={{ marginTop: 0 }}>{title}</h4>
        <div>{children}</div>
        </div>
    );
}

// ============================================================
// Demo C — Generic component
// ============================================================
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// ============================================================
// Demo D — Custom hook with tuple return type
// ============================================================
function useToggle(initial = false): [boolean, () => void] {
    const[value, setValue] = useState<boolean>(initial);
    const toggle = () => setValue((v) => !v);
    return [value, toggle];
}

// ============================================================
// Demo E — Optional props with default values
// ============================================================
interface BadgeProps {
  label: string;
  color?: string;
}

function Badge({ label, color = 'gray' }: BadgeProps) {
  return (
    <span
      style={{
        background: color,
        color: 'white',
        borderRadius: '999px',
        padding: '0.2rem 0.6rem',
        fontSize: '0.85rem',
        marginRight: '0.5rem',
      }}
    >
      {label}
    </span>
  );
}

export default function Step12_TypeScriptPatterns(){
     // Demo B state
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked, target element:', e.currentTarget);
  }

   // Demo D state
  const [isOpen, toggleOpen] = useToggle();

  // Demo C sample data
  const stringItems = ['apple', 'banana', 'cherry'];
  const userItems = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  return (
    <div>
      <h2>Step 12: TypeScript-Specific React Patterns</h2>

      {/* Demo A */}
      <h3>A: Typing children (React.ReactNode)</h3>
      <Card title="Plain text child">
        This is just a plain string child.
      </Card>
      <Card title="JSX children">
        <ul>
          <li>Item one</li>
          <li>Item two</li>
        </ul>
        <button onClick={() => alert('Hi from inside a Card!')}>Click me</button>
      </Card>

      {/* Demo B */}
      <h3>B: Typing event handlers</h3>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <button onClick={handleClick}>Log Event Target</button>

      {/* Demo C */}
      <h3>C: Generic List component</h3>
      <p>List of strings:</p>
      <List items={stringItems} renderItem={(s) => s.toUpperCase()} />

      <p>List of user objects:</p>
      <List items={userItems} renderItem={(u) => `${u.id}: ${u.name}`} />

      {/* Demo D */}
      <h3>D: Custom hook with tuple return (useToggle)</h3>
      <button onClick={toggleOpen}>{isOpen ? 'Hide' : 'Show'} content</button>
      {isOpen && <p>👋 Here's the toggled content!</p>}

      {/* Demo E */}
      <h3>E: Optional props with defaults</h3>
      <Badge label="Default color" />
      <Badge label="Custom color" color="#4f46e5" />
    </div>
  );
}
