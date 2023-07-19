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
        }
    },
});

export const { setRegisterFetching, setError } = registerSlice.actions;

export default registerSlice.reducer;