import { createSlice } from "@reduxjs/toolkit";

const slotsSlice = createSlice({
  name: "slots",
  initialState: {
    currentSlotNumber:"",
    userSlotNumber:"",
  },
  reducers: {
    setCurrentSlotNumber:(state, action) => {
      state.currentSlotNumber = action.payload;
    },
    setUserSlotNumber:(state, action) => {
      state.userSlotNumber = action.payload;
    }
  },
});

export const {setCurrentSlotNumber, setUserSlotNumber } = slotsSlice.actions;
export default slotsSlice.reducer;
