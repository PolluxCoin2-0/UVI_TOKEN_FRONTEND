import { createSlice } from "@reduxjs/toolkit";

const slotsSlice = createSlice({
  name: "slots",
  initialState: {
    currentSlotNumber:"",
  },
  reducers: {
    setCurrentSlotNumber:(state, action) => {
      state.currentSlotNumber = action.payload;
    },
  },
});

export const {setCurrentSlotNumber } = slotsSlice.actions;
export default slotsSlice.reducer;
