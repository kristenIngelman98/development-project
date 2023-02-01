import  { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/todos/todosSlice";

export default configureStore({
    reducer: {
        tasks: taskReducer
    }
})