import { increment, decrement, incrementByAmount } from '../redux/counterSlice';
import { type RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../redux/userSlice';
import { memo } from 'react';

export default function Step09_Redux() {
    const dispatch = useDispatch();
    const counterValue = useSelector((state: RootState) => state.counter.value);

    return (
        <div>
            <h2>Redux Counter</h2>
            <p>Counter Value: {counterValue}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
            <button onClick={() => dispatch(setName("Sam"))}>Set Name</button>
            <CounterDisplay />
            <UserDisplay />
        </div>
    );
}

const CounterDisplay = memo(function CounterDisplay() {
    const counterValue = useSelector((state: RootState) => state.counter.value);
    console.log('CounterDisplay rendered')
    return <div>Counter Display: {counterValue}</div>;
});

const UserDisplay = memo(function UserDisplay() {
    const userName = useSelector((state: RootState) => state.user.name);
    console.log('UserDisplay rendered')
    return <div>User Display: {userName}</div>;
});