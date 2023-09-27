import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contact: {}
}

const findContactSlice = createSlice({
    name: 'findContact',
    initialState,
    reducers: {
        contactFound: (state = null, action) => {
            state.contact = action.payload;
        }
    },
});

export const { contactFound } = findContactSlice.actions;

export default findContactSlice.reducer;