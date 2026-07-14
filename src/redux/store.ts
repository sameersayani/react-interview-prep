import { configureStore } from '@reduxjs/toolkit'; // Creates a Redux store with recommended middleware and DevTools support.
import counterReducer from './counterSlice'; // Imports the reducer responsible for counter state.
import userReducer from './userSlice'; // Imports the reducer responsible for user state.

export const store = configureStore({ // Creates and exports the single global client-state store.
    reducer: { // Combines slice reducers into the root state object.
        counter: counterReducer, // Makes counter state available at `state.counter`.
        user: userReducer, // Makes user state available at `state.user`.
    },
});

export type RootState = ReturnType<typeof store.getState>; // Derives the exact selector-state type from the configured store.
