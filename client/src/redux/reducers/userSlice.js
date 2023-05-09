import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null,
  value: null,
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
      
      // const userEmail = state.value.email;
      // const contactEmail = action.payload.email;

      const user = action.payload

      if (state.value.username === user.username) {
        state.value.requests = user.requests
      }

      // if (userEmail === contactEmail){
      //   state.value.requests = [...state.value.requests, action.payload.email];
      // }
    },
    acceptNewRequest: (state=null, action) => {
      state.isFetching = false;

      const user = action.payload[0]
      const contact = action.payload[1]

      if (state.value.username === user.username) {
        state.value.contacts = [...state.value.contacts, contact.username]
      }
      if (state.value.username === contact.username) {
        state.value.contacts = [...state.value.contacts, user.username]
      }

    },
    deleteRequest: (state=null, action) => {
      state.isFetching = false;
      state.value = action.payload;
    }
  },
});

export const {
  setUser,
  setUserFetching,
  addContact,
  addRequest,
  acceptNewRequest,
  deleteRequest
} = userSlice.actions;

export default userSlice.reducer;