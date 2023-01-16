import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    const initialValue = JSON.parse(saved)
    return initialValue || []
  });

  const todoNameRef = useRef()

  // useEffect saves all todos to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log(localStorage)
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos] // should never directly modify a state variable, always create a copy before modifying (use copy to modify state)
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log('NAME', name)
    setTodos(prevTodos => [...prevTodos, { id: uuid(), name: name, complete: false}])
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)

  }

  return (
    <>
     <TodoList todos={todos} toggleTodo={toggleTodo} />
     <input ref={todoNameRef} type="text"></input>
     <button onClick={handleAddTodo}>Add Todo</button>
     <button onClick={handleClearTodos}>Clear Completed Todos</button>
     <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
