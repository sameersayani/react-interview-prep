import { createSlice, type PayloadAction } from '@reduxjs/toolkit'; // Generates typed Redux actions and a reducer.

interface CounterState { // Defines this slice's state contract.
    value: number; // Holds the numeric counter value.
}

const initialState: CounterState = { // Sets the state used before the first Redux action.
    value: 0, // Starts the counter at zero.
};

const counterSlice = createSlice({ // Creates related action creators and reducer cases together.
    name: 'counter', // Prefixes generated action types with `counter/`.
    initialState, // Registers the counter's initial value.
    reducers: {
        increment: (state) => { // Responds to an increment action with no payload.
            state.value += 1; // Immer safely turns this mutation-like code into immutable state.
        },
        decrement: (state) => { // Responds to a decrement action.
            state.value -= 1; // Produces the next counter value one lower.
        },
        incrementByAmount: (state, action: PayloadAction<number>) => { // Requires a numeric amount in the action.
            state.value += action.payload; // Adds the caller-provided payload to current state.
        }
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions; // Exposes generated actions to UI code.
export default counterSlice.reducer; // Lets the root store install this slice reducer.
