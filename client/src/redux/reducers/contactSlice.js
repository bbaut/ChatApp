import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null,
  value: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    isFetching: (state=null, action) => {
      state.isFetching = true;
    },

    setData: (state=null, action) => {
        const imagesArray = action.payload.map(user => {
            return user.image
        })
      state.isFetching = false;
      state.value = action.payload
    },
  },
});

export const {
  setData,
  isFetching
} = contactSlice.actions;

export default contactSlice.reducer;