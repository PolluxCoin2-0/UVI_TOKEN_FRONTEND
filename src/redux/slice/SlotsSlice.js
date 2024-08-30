import { createSlice } from "@reduxjs/toolkit";

const slotsSlice = createSlice({
  name: "slots",
  initialState: {
    currentSlotNumber:"",
    userSlotNumber:"",
    userSlotDate:"",
  },
  reducers: {
    setCurrentSlotNumber:(state, action) => {
      state.currentSlotNumber = action.payload;
    },
    setUserSlotNumber:(state, action) => {
      state.userSlotNumber = action.payload;
    },
    setUserSlotDate: (state, action) => {
      state.userSlotDate = action.payload;
    },
  },
});

export const {setCurrentSlotNumber, setUserSlotNumber, setUserSlotDate } = slotsSlice.actions;
export default slotsSlice.reducer;
