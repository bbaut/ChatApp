import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    currentRoom: '',
    chatMember: '',
    value: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state = null, action) => {
            state.isFetching = false;
            state.value = [...state.value, action.payload]
        },
        currentRoom: (state = null, action) => {
            state.currentRoom = action.payload.chatId;
            state.chatMember = action.payload.chatMember
        },
        getRoomMessages: (state = null, action) => {
            state.value = action.payload;
            state.isFetching = false;
        },
        isFetching: (state=null, action) => {
            state.isFetching = true;
        }
    },
});

export const { addMessage, currentRoom, getRoomMessages, isFetching } = chatSlice.actions;

export default chatSlice.reducer;

