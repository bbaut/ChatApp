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
  setData
} = contactSlice.actions;

export default contactSlice.reducer;