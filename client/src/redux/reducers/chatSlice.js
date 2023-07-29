import { compose, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    currentRoom: '',
    chatMember: '',
    groupMembers: [],
    groupName: '',
    createdBy: '',
    value: [],
    valueGroup: [],
    notifications: {},
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state = null, action) => {
            state.isFetching = false;
            state.value = [...state.value, action.payload]
            state.valueGroup =  [...state.valueGroup, action.payload]
            if(action.payload.sender === "received"){
                state.notifications = true
            }
        },
        addMessageParticipants: (state = null, action) => {
            state.isFetching = false;
            state.valueGroup =  [...state.valueGroup, action.payload]
        },
        currentGroup: (state = null, action) => {
            state.isFetching = false;
            state.currentRoom = action.payload._id;
            state.groupMembers = action.payload.members;
            state.groupName = action.payload.groupName;
            state.createdBy = action.payload.createdBy;
        },
        setChat:(state = null) => {
            console.log("hey")
            state.currentRoom = "";
            state.chatMember= '';
            state.groupMembers= [];
            state.groupName= '';
            state.createdBy= '';
            state.value = [];
            state.valueGroup= [];
        },
        currentRoom: (state = null, action) => {
            state.isFetching = false;
            state.currentRoom = action.payload.chatId;
            state.chatMember = action.payload.chatMember;
        },
        getRoomMessages: (state = null, action) => {
            state.value = action.payload;
            state.valueGroup = action.payload;
            state.isFetching = false;
        },
        setAddedMember: (state = null, action) => {
            state.chatMember = [...state.chatMember, action.payload]
        },
        setRemovedMember: (state = null, action) => {
              const newMembers = [];

              state.chatMember.forEach(element => {
                    if(element !== action.payload){
                       newMembers.push(element)
                    }
              })

              state.chatMember = newMembers;
        },
        isFetching: (state=null, action) => {
            state.isFetching = true;
        },
        setNotification: (state=null, action) => {
            if(action.payload.received !== action.payload.sender){
                state.notifications = action.payload 
            }
        },
        resetNotifications: (state=null, action) => {
            state.notifications = 0;
        }
    },
});

export const { addMessage, setChat, addMessageParticipants, currentRoom, currentGroup, getRoomMessages, setAddedMember, setRemovedMember, isFetching, setNotification, resetNotifications } = chatSlice.actions;

export default chatSlice.reducer;

