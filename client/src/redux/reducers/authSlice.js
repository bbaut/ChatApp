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
        let auth = { 
          userAuthenticated: action.payload
        }
        state.auth = auth
        state.isFetching = false;
      },
      logoutUser: (state=null, action) => {
        state.auth = action.payload
      },
      loading: (state=null, action) => {
        // console.log(action.payload)
        state.isLoading = action.payload
      },
      fetching: (state=null, action) => {
        state.isFetching = action.payload
      }
    },
  });
  
  export const {
    auth,
    logoutUser,
    loading,
    fetching
  } = authSlice.actions;
  
  export default authSlice.reducer;