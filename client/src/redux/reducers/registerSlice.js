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
        setRegisterFetching: (state = null) => {
            state.isFetching = true;
        },
    },
});

export const { setRegisterFetching } = registerSlice.actions;

export default registerSlice.reducer;