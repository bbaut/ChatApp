import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "welcome"
};

const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        setDisplay: (state = null, action) => {
            state.value = action.payload;
        },
        cleanDisplayState: () => initialState
    },
});

export const { setDisplay, cleanDisplayState } = displaySlice.actions;

export default displaySlice.reducer;