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
      console.log(action)
      state.isFetching = false;
      state.value = action.payload;
    },
    addRequest: (state = null, action) => {
      state.isFetching = false;
      
      const userEmail = state.value.email;
      const contactEmail = action.payload.email;

      if (userEmail === contactEmail){
        console.log("i'm here")
        state.value.requests = [...state.value.requests, action.payload.email];
        console.log(state.value.requests)
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
  deleteRequest
} = userSlice.actions;

export default userSlice.reducer;