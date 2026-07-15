import { useRef, useState } from "react";

export default function Step14_ControlledStorage(){
    // ===================== Part A: Controlled =====================
    const[controlledValue, setControlledValue] = useState<string>("");

     // ===================== Part B: Uncontrolled =====================
    const uncontrolledInputRef = useRef<HTMLInputElement>(null);
    const[lastReadValue, setLastReadValue] = useState<string>('');

    const handleReadUncontrolled = () => {
        setLastReadValue(uncontrolledInputRef.current?.value ?? '');
    }

     // ===================== Part C: Storage =====================
    const [localStorageValue, setLocalStorageValue] = useState<string>('');
    const [sessionStorageValue, setSessionStorageValue] = useState<string>('');
    const [cookieValue, setCookieValue] = useState<string>('');

    const saveToLocalStorage = () => {
        localStorage.setItem('demoKey', controlledValue);
    }

    const readFromLocalStorage = () => {
        setLocalStorageValue(localStorage.getItem('demoKey') ?? 'nothing stored');
    }

    const saveToSessionStorage = () => {
        sessionStorage.setItem('demoKey', controlledValue);
    }

    const readFromSessionStorage  = () => {
        setSessionStorageValue(sessionStorage.getItem('demoKey') ?? 'nothing stored')
    }

      const saveToCookie = () => {
        // Setting a cookie: "key=value; max-age=<seconds>; path=/"
        // max-age here is 1 day (in seconds), so it doesn't linger forever during testing
        document.cookie = `demoKey=${encodeURIComponent(controlledValue)}; max-age=86400; path=/`;
    };

        const readFromCookie = () => {
        // document.cookie returns ALL cookies as one string, e.g.:
        // "demoKey=hello; otherCookie=123; anotherOne=abc"
        // so we split on "; " and find the one matching our key.
        const allCookies = document.cookie.split('; ');
        const match = allCookies.find((row) => row.startsWith('demoKey='));
        const value = match ? decodeURIComponent(match.split('=')[1]) : '(nothing stored)';
        setCookieValue(value);
    };

    return(
        <>
        <h3>Controlled example</h3>
            <input value={controlledValue} onChange={(e) => setControlledValue(e.target.value)}/>
            <p>Controlled value: {controlledValue}</p>

          <h3>Uncontrolled example</h3>
          <input defaultValue="Hello" ref={uncontrolledInputRef} />
          <button onClick={handleReadUncontrolled}>Read uncontrolled value</button>
           <p>Last read value: {lastReadValue}</p>

           <h3>C: Browser storage comparison</h3>
      <p>
        Type something in the <strong>controlled input above</strong>, then use the
        buttons below to save it to each storage mechanism. Refresh the page (keep
        the tab open) and try reading each again — then close the tab entirely,
        reopen the app, and try reading again to see the difference.
      </p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <h4>localStorage</h4>
          <button onClick={saveToLocalStorage}>Save</button>
          <button onClick={readFromLocalStorage}>Read</button>
          <p>Value: {localStorageValue}</p>
        </div>

        <div>
          <h4>sessionStorage</h4>
          <button onClick={saveToSessionStorage}>Save</button>
          <button onClick={readFromSessionStorage}>Read</button>
          <p>Value: {sessionStorageValue}</p>
        </div>

        <div>
          <h4>Cookie</h4>
          <button onClick={saveToCookie}>Save</button>
          <button onClick={readFromCookie}>Read</button>
          <p>Value: {cookieValue}</p>
        </div>
      </div>
        </>
    )
}