import { compose, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: null,
    currentRoom: '',
    currentChat: 'undefined',
    currentGroup: 'undefined',
    chatMember: [],
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
            console.log(action.payload.chatId)
            if(state.currentRoom === action.payload.chatId) {
                state.isFetching = false;
                state.value = [...state.value, action.payload]
                state.valueGroup =  [...state.valueGroup, action.payload]
                if(action.payload.sender === "received"){
                    state.notifications = true
                }
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
            state.groupMembers = [...state.groupMembers, action.payload]
        },
        setRemovedMember: (state = null, action) => {
              const newMembers = [];

              if(state.chatMember.length !== 0){
                  state.chatMember.forEach(element => {
                        if(element !== action.payload){
                           newMembers.push(element)
                        }
                    })
              }
              else {
                state.groupMembers.forEach(element => {
                    if(element !== action.payload){
                       newMembers.push(element)
                    }
                })
            }
            state.groupMembers = newMembers;

              state.chatMember = newMembers;
        },
        isFetching: (state=null, action) => {
            state.isFetching = true;
        },
        setNotification: (state=null, action) => {
            state.notifications = action.payload
        },
        resetNotifications: (state=null, action) => {
            state.notifications = 0;
        },
        currentChat: (state=null, action) => {
            state.currentChat = action.payload.chat
        },
        currentGroupChat: (state=null, action) => {
            state.currentGroup = action.payload.group
        }
    },
});

export const { addMessage, setChat, addMessageParticipants, currentRoom, currentGroup, getRoomMessages, setAddedMember, setRemovedMember, isFetching, setNotification, resetNotifications, currentChat, currentGroupChat} = chatSlice.actions;

export default chatSlice.reducer;

