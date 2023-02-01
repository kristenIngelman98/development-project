import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
      addTodo: (state, action) => {
          const newTask = {
              id: Math.random().toString(36).slice(2),
              name: action.payload.task
          }
          state.push(newTask)
      },
      deleteTodo: (state, action) => {
          return state.filter((item) => item.id !== action.payload.id)
      },
      // deleteBulk: (state, action) => {

      // }
  }
});

export const { addTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;