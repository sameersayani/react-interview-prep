import { createSlice, type PayloadAction } from '@reduxjs/toolkit'; // Builds Redux actions/reducer and types action payloads.

interface UserState { // Describes the TypeScript shape owned by this Redux slice.
  name: string; // Stores the current user's display name.
}

const initialState: UserState = { // Defines predictable state before any action is dispatched.
  name: '', // Starts with no selected user name.
};

const userSlice = createSlice({ // Generates the reducer and action creators for user state.
  name: 'user', // Prefixes generated Redux action types with `user/`.
  initialState, // Supplies the slice's starting value.
    reducers: {
        setName: (state, action: PayloadAction<string>) => { // Handles a string payload sent by the UI.
            state.name = action.payload; // Uses Immer-backed mutation syntax to produce immutable Redux state.
        }
    },
});

export const { setName } = userSlice.actions; // Exports the generated action creator for components to dispatch.
export default userSlice.reducer; // Exports the reducer so the store can register this slice.
