import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null,
  isLoading: true,
  auth: {},
};

const cleanState = {
  isFetching: false,
  error: null,
  isLoading: false,
  auth: {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      auth: (state=null, action) => {
        state.error = null
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
        state.isLoading = action.payload
      },
      fetching: (state=null, action) => {
        state.isFetching = action.payload
      },
      loginError: (state=null, action) => {
        state.error = action.payload
      },
      cleanAuthState: () => cleanState
    },
  });
  
  export const {
    auth,
    logoutUser,
    loading,
    fetching,
    loginError,
    cleanAuthState
  } = authSlice.actions;
  
  export default authSlice.reducer;