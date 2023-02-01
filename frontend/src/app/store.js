import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import dateReducer from '../features/date/dateSlice';
import todosReducer from '../features/todos/todosSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    calcDate: dateReducer,
    addTodo: todosReducer
  }
});
