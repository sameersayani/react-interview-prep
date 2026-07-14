import {useState, useRef, useMemo, useCallback, memo} from 'react';

const ChildButton = memo(function ChildButton( {onClick }: {onClick: () => void}) {
    console.log('ChildButton rendered');
    return (
        <button onClick={onClick}>Child Button</button>
    );
});

export default function Step05_RefsMemo() {
    const  inputRef = useRef<HTMLInputElement>(null);
    const [numberInput, setNumberInput] = useState<number>(0);
    const [unrelatedCounter , setUnrelatedCounter] = useState<number>(0);   

    const handleClick = useCallback(() => {
        console.log('clicked');
    }, []);

    function slowFibonacci(n: number) {
        console.log(`Calculating fibonacci... ${n}`);
        if (n <= 1) return n;
        return slowFibonacci(n - 1) + slowFibonacci(n - 2);
    }
    return (
        <>
            <input ref={inputRef} type="text" placeholder="Type.." />
            <button onClick={() => inputRef.current?.focus()}>Focus the input</button>
            <input type="number" value={numberInput} 
            onChange={(e) => setNumberInput(Number(e.target.value))} />
            <p>Fibonacci result: 
                { useMemo (() => {
                    console.log(`>>> Running top-level fibonacci calculation for n=${numberInput}`);
                    return slowFibonacci(numberInput);
                }, [numberInput])}
                </p>
            <button onClick={() => setUnrelatedCounter(prev => prev + 1)}>
                Unrelated Counter: {unrelatedCounter}
            </button>
            <ChildButton onClick={handleClick} />
        </>
    );
}