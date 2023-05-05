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
    addContact: (state = null, action) => {
      console.log(action)
      state.isFetching = false;
      state.value = action.payload;
    },
    addRequest: (state = null, action) => {
      state.isFetching = false;
      console.log(state.value)
      console.log(action.payload)
      if (state.value.username === action.payload.to.username) {
        state.value.requests = [...state.value.requests, action.payload];
      }
    },
  },
});

export const {
  addContact,
  addRequest
} = userSlice.actions;

export default userSlice.reducer;