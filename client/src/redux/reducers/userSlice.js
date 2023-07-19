import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null,
  value: null,
  language: "en",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state=null, action) => {
      state.isFetching = false;
      state.value = action.payload
    },
    setUserFetching: (state = null) => {
      state.isFetching = true;
    },
    addContact: (state = null, action) => {
      state.isFetching = false;
      state.value = action.payload;
    },
    addRequest: (state = null, action) => {
      state.isFetching = false;

      const user = action.payload

      if (state.value.username === user.username) {
        state.value.requests = user.requests
      }
    },
    addUsernameRequests: (state=null, action) => {
      state.isFetching = false;
      const usernameRequests = action.payload
      state.value.requests = usernameRequests
    },
    acceptNewRequest: (state=null, action) => {
      state.isFetching = false;

      const user = action.payload[0]
      const contact = action.payload[1]

      if (state.value.username === user.username) {
        state.value.contacts = [...state.value.contacts, contact.username]
        state.value.requests = user.requests
      }
      if (state.value.username === contact.username) {
        state.value.contacts = [...state.value.contacts, user.username]
        state.value.requests = contact.requests
      }

    },
    deleteRequest: (state=null, action) => {
      state.isFetching = false;
      state.value = action.payload;
    },
    addGroup: (state=null, action) => {
      if (state.value.username === action.payload.groups.username){
        state.value.groups = action.payload.groups.groups
      }
    },
    setLanguage: (state=null, action) => {
      state.language = action.payload
    },
    deleteContact: (state=null, action) => {
      state.isFetching = false;

      const user = action.payload[0]
      const contact = action.payload[1]

      if (state.value.username === user.username) {
        console.log(user.contacts)
        state.value.contacts = user.contacts
      }
      if (state.value.username === contact.username) {
        console.log(contact.contacts)
        state.value.contacts = contact.contacts
      }
    }
  },
});

export const {
  setUser,
  setUserFetching,
  addContact,
  addUsernameRequests,
  addRequest,
  acceptNewRequest,
  deleteRequest,
  addGroup,
  setLanguage,
  deleteContact
} = userSlice.actions;

export default userSlice.reducer;