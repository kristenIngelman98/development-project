import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

export default function TodoList({ todos2, toggleTodo, deleteSingleTodo }) {
    const todos = useSelector((state) => {
        return state.tasks;
    })
    console.log("TODOS", todos)
  return (
    todos.map(todo => {
      return <TodoItem key={todo.id} id={todo.id} title={todo.name} completed={todo.status} toggleTodo={toggleTodo} todo={todo} />
    })
  )
}