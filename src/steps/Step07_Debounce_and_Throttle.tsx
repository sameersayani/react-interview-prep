import { useEffect, useState } from "react";
import {useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";

type Point = {
    x: number;
    y: number;
};

export default function Step07_Debounce_and_Throttle() {
const [searchTerm, setSearchTerm] = useState<string>('');
const debouncedSearchTerm = useDebounce(searchTerm, 500); 

useEffect(() => {
    if (debouncedSearchTerm) {
        console.log(`Searching for: ${debouncedSearchTerm}`);
    }
}, [debouncedSearchTerm]);

const [cursor, setCursor] = useState<Point>({ x: 0, y: 0 });
    const [rawEventCount, setRawEventCount] = useState(0);
    const throttledCursor = useThrottle(cursor, 200);

const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const newCursor = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  console.log('Raw mouse move:', newCursor);
  setCursor(newCursor);
  setRawEventCount((count) => count + 1);
};

return (
    <>
    <div>
        <h3>Debounce demo</h3>
        <input type="text" 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Type to search..." />
    </div>
         <div style={{ display: "grid", gap: "1rem" }}>
            <div>
                <h3>Throttle demo</h3>
                <p>Move your cursor inside the box. The raw mouse-move updates happen constantly, but the displayed dot only refreshes every ~200ms.</p>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <strong>Raw events:</strong> {rawEventCount}
                <strong>Throttled coords:</strong> ({throttledCursor.x}, {throttledCursor.y})
            </div>

            <div
                onMouseMove={handleMouseMove}
                style={{
                    position: "relative",
                    width: "320px",
                    height: "220px",
                    border: "2px solid #4f46e5",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
                    overflow: "hidden",
                    cursor: "crosshair",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: throttledCursor.x,
                        top: throttledCursor.y,
                        width: "14px",
                        height: "14px",
                        borderRadius: "999px",
                        background: "#ef4444",
                        border: "2px solid white",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </div>
    </>
);
}