import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null,
  isLoading: true,
  auth: {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      auth: (state=null, action) => {
        state.isFetching = false;
        state.auth = action.payload
      },
      loading: (state=null, action) => {
        state.isLoading = action.payload
      },
    },
  });
  
  export const {
    auth,
    loading
  } = authSlice.actions;
  
  export default authSlice.reducer;