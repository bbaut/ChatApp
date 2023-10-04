import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    value: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegisterFetching: (state = null, action) => {
            state.isFetching = action.payload;
        },
        setError: (state = null, action) => {
            state.error = action.payload
        },
        cleanRegisterState: () => initialState
    },
});

export const { setRegisterFetching, setError, cleanRegisterState } = registerSlice.actions;

export default registerSlice.reducer;