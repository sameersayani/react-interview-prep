import React, { Suspense, lazy, memo, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';

// ============================================================
// Demo A — memo + inline vs memoized props
// ============================================================
interface ExpensiveChildProps {
  style: React.CSSProperties;
  label: string;
}

const ExpensiveChild = memo(function ExpensiveChild({ style, label }: ExpensiveChildProps) {
  console.log(`ExpensiveChild rendered (${label})`);
  return <p style={style}>I am the {label} child</p>;
});

// ============================================================
// Demo B — lazy loaded component
// ============================================================
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ============================================================
// Demo C — helper to measure render timing
// ============================================================
function RenderTimer({
  children,
  onRendered,
}: {
  children: React.ReactNode;
  onRendered: (time: number) => void;
}) {
  useState(() => {
    requestAnimationFrame(() => {
      onRendered(performance.now());
    });
    return null;
  });

  return <>{children}</>;
}

// ============================================================
// Main Step Component
// ============================================================
export default function Step13_Performance() {
  // Demo A state
  const [count, setCount] = useState(0);
  const inlineStyle = { color: 'blue' };
  const memoizedStyle = useMemo(() => ({ color: 'green' }), []);

  // Demo B state
  const [showHeavy, setShowHeavy] = useState(false);

  // Demo C state
  const [showList, setShowList] = useState(false);
  const [plainRenderTime, setPlainRenderTime] = useState<number | null>(null);
  const [virtualRenderTime, setVirtualRenderTime] = useState<number | null>(null);
  const [plainStart, setPlainStart] = useState<number | null>(null);
  const [virtualStart, setVirtualStart] = useState<number | null>(null);

  const items = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => `Item #${i + 1}`),
    []
  );

  const handleShowList = () => {
    const now = performance.now();
    setPlainStart(now);
    setVirtualStart(now);
    setShowList(true);
  };

  return (
    <div>
      <h2>Step 13: Performance & Gotchas</h2>

      {/* ===================== Demo A ===================== */}
      <h3>A: Inline props vs memoized props</h3>
      <button onClick={() => setCount((c) => c + 1)}>
        Unrelated Counter: {count}
      </button>
      <ExpensiveChild style={inlineStyle} label="inline (re-renders every time)" />
      <ExpensiveChild style={memoizedStyle} label="memoized (stable, skips re-render)" />

      <hr />

      {/* ===================== Demo B ===================== */}
      <h3>B: Code splitting with React.lazy + Suspense</h3>
      <button onClick={() => setShowHeavy(true)}>
        Load Heavy Component
      </button>
      {showHeavy && (
        <Suspense fallback={<p>Loading...</p>}>
          <HeavyComponent />
        </Suspense>
      )}

      <hr />

      {/* ===================== Demo C ===================== */}
      <h3>C: Virtualization — plain render vs react-window</h3>
      <p>
        Both lists below render the exact same {items.length.toLocaleString()} items.
        The left one mounts all 10,000 real DOM nodes. The right one (react-window's
        FixedSizeList) only mounts the rows currently visible in the scroll window.
      </p>

      <button onClick={handleShowList} disabled={showList}>
        {showList ? 'Rendered' : 'Render both lists'}
      </button>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        {/* Plain version — all 10,000 real DOM nodes */}
        <div>
          <h4>Plain (10,000 real divs)</h4>
          {plainRenderTime !== null && (
            <p>⏱️ {plainRenderTime.toFixed(2)}ms</p>
          )}
          {showList && (
            <RenderTimer
              onRendered={(time) => {
                if (plainStart !== null) setPlainRenderTime(time - plainStart);
              }}
            >
              <div
                style={{
                  height: '300px',
                  width: '250px',
                  overflowY: 'auto',
                  border: '1px solid #ccc',
                }}
              >
                {items.map((item, i) => (
                  <div
                    key={i}
                    style={{ padding: '4px 8px', borderBottom: '1px solid #eee' }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </RenderTimer>
          )}
        </div>

        {/* Virtualized version — only visible rows mounted */}
        <div>
          <h4>Virtualized (react-window)</h4>
          {virtualRenderTime !== null && (
            <p>⏱️ {virtualRenderTime.toFixed(2)}ms</p>
          )}
          {showList && (
            <RenderTimer
              onRendered={(time) => {
                if (virtualStart !== null) setVirtualRenderTime(time - virtualStart);
              }}
            >
              <FixedSizeList
                height={300}
                width={250}
                itemCount={items.length}
                itemSize={30}
              >
                {({ index, style }) => (
                  <div
                    style={{
                      ...style,
                      padding: '4px 8px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    {items[index]}
                  </div>
                )}
              </FixedSizeList>
            </RenderTimer>
          )}
        </div>
      </div>
    </div>
  );
}