import { memo } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';

// Level 3 — the ONLY component that actually knows about theme.
// It reads the value AND can change it via toggleTheme.
function Level3() {
  console.log('Level3 rendered');
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        padding: '1rem',
        background: theme === 'dark' ? '#111' : '#fff',
        color: theme === 'dark' ? '#fff' : '#111',
        border: '1px solid #ccc',
      }}
    >
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// Level 2 — has NO idea theme even exists.
// It just renders Level3, purely to create nesting depth.
const Level2 = memo(function Level2() {
  console.log('Level2 rendered');
  return <Level3 />;
});

// Level 1 — also has NO idea theme exists.
// Same purpose: just adds another layer between the Provider and Level3.
const Level1 = memo(function Level1() {
  console.log('Level1 rendered');
  return <Level2 />;
});

export default function Step08_Context() {
  return (
    <div>
      <h2>Step 8: Context API</h2>
      <p>This step demonstrates the use of React's Context API.</p>
      <ThemeProvider>
        <Level1 />
      </ThemeProvider>
    </div>
  );
}