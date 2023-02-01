import { createSlice } from "@reduxjs/toolkit";
import { format } from 'date-fns';

let current_date = format(new Date(), "MMM d, y");
let current_time = format(new Date(), "h:mm aaa")
export const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: format(new Date(), "MMM d, y"),
    time: format(new Date(), "h:mm aaa")
  },
  reducers: {
    updatedDate: (state) => {
      state.date = format(new Date(), "MMM d, y")
    },
    updatedTime: (state) => {
      state.time = format(new Date(), "h:mm aaa")
      console.log('in updatedTime func')
      console.log(state.time)
    },
  }
});

// Action creators are generated for each case reducer function
export const { updatedDate, updatedTime } = dateSlice.actions;

export default dateSlice.reducer;