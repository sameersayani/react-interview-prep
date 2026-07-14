import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRan.current;

    console.log(`useThrottle effect fired. value=${JSON.stringify(value)}, timeSinceLastRun=${timeSinceLastRun}`);

    if (timeSinceLastRun >= limit) {
      console.log('>>> UPDATING immediately (enough time passed)');
      lastRan.current = now;
      setThrottledValue(value);
    } else {
      const remaining = limit - timeSinceLastRun;
      console.log(`>>> SKIPPING for now, scheduling trailing update in ${remaining}ms`);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        console.log('>>> TRAILING update firing now');
        lastRan.current = Date.now();
        setThrottledValue(value);
      }, remaining);
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, limit]);

  return throttledValue;
}