import { useState } from 'react'; // Tracks which learning-step component the user selected.
import Step01 from './steps/Step01_PropsState';
import Step02 from './steps/Step02_UseStateRerender';
import Step03 from './steps/Step03_UseEffect';
import Step04 from './steps/Step04_VirtualDom';
import Step05 from './steps/Step05_RefsMemo';
import Step06 from './steps/Step06_CustomHooks';
import Step07 from './steps/Step07_Debounce_and_Throttle';
import Step08 from './steps/Step08_Context';
import Step09 from './steps/Step09_Redux';
import Step10 from './steps/Step10_TanStackQuery';
import Step11 from './steps/Step11_Routing';
import Step12 from './steps/Step12_TypeScriptPatterns';
import Step13 from './steps/Step13_Performance';
import Step14 from './steps/Step14_ControlledStorage';

const steps: Record<string, React.ComponentType> = { // Maps visible labels to components; ComponentType means each value is renderable.
  'Step 1: Props & State': Step01,
  'Step 2: useState & Re-renders': Step02,
  'Step 3: useEffect': Step03,
  'Step 4: Virtual DOM': Step04,
  'Step 5: useRef & useMemo': Step05,
  'Step 6: Custom Hooks': Step06,
  'Step 7: Debounce & Throttle': Step07,
  'Step 8: Context API': Step08,
  'Step 9: Redux': Step09,
  'Step 10: TanStack Query': Step10,
  'Step 11: Routing': Step11,
  'Step 12: TypeScript Pattern': Step12,
  'Step 13: Performance' : Step13,
  'Step 14: Controller UnControlled Storage': Step14
};

function App() { // Root component coordinates the sidebar and selected lesson.
  const [active, setActive] = useState<string>(Object.keys(steps)[0]); // Selects the first lesson initially and stores later choices.
  const ActiveComponent = steps[active]; // Converts state into a component reference; the capital name makes JSX treat it as a component.

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <nav style={{ width: '220px', padding: '1rem', borderRight: '1px solid #ccc' }}>
        {Object.keys(steps).map((key) => ( // List rendering creates one navigation button per lesson.
          <button
            key={key} // Stable key lets React reconcile this button with later renders.
            onClick={() => setActive(key)} // Event handler updates state and selects this lesson.
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '0.5rem',
              fontWeight: active === key ? 'bold' : 'normal', // Conditional styling identifies the active lesson.
            }}
          >
            {key} {/* Displays the lesson label from the object key. */}
          </button>
        ))}
      </nav>
      <main style={{ flex: 1, padding: '2rem' }}>
        <ActiveComponent /> {/* Dynamically renders the component selected by state. */}
      </main>
    </div>
  );
}

export default App; // Makes the root component available to the bootstrap file.
