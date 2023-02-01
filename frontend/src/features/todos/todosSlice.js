import { createSlice } from "@reduxjs/toolkit";

// export const todosSlice = createSlice({
//   name: "todos",
//   initialState: [],
//   reducers: {
//     addTodo: (state, action) => {
//         const newTodo = {
//             name: action.payload.task,
//             id: Math.random().toString(36).slice(2),
//             completed: false
//         }
//         state.push(newTodo)
//     },
//     deleteTodo: (state, action) => {
//       console.log('deleteTodo was reached')
//       return state.filter((item) => item.id !== action.payload.id)
//     }
//   }
// });

// // Action creators are generated for each case reducer function
// export const { addTodo, deleteTodo } = todosSlice.actions;

// export default todosSlice.reducer;

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
      }
  }
});

export const { addTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;