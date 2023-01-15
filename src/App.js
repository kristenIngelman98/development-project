import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid'


const LOCAL_STORAGE_KEY = `todoApp.todos`

function App() {
  // const initialCount = 0
  // const [count, setCount] = useState(initialCount)

  // const incrementFive = () => {
  //   for(let i = 0; i < 5; i++) {
  //     setCount(prevCount => prevCount + 1)
  //   }
  // }

  // return (
  //   <div>
  //     Count: {count}
  //     <button onClick={() => setCount(initialCount)}>Reset</button>
  //     <button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</button>
  //     <button onClick={() => setCount(prevCount => prevCount - 1)}>Decrement</button>
  //     <button onClick={incrementFive}>Increment by 5</button>
  //   </div>
  // )
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // use the second useEffect to load to todos saved in local storage
  useEffect(() => {
    console.log('in second effect')
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log('stored todos', storedTodos)
    if(storedTodos) {
      setTodos(storedTodos)
    }
    console.log('after if', storedTodos)
  }, []) // use empty array so that this function only runs once, right at the beginning (to load the items in local storage)

  // first useEffect saves all todos to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log(localStorage)
  }, [todos])


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log('NAME', name)
    setTodos(prevTodos => [...prevTodos, { id: uuid(), name: name, complete: false}])
    todoNameRef.current.value = null
  }

  return (
    <>
     <TodoList todos={todos}/>
     <input ref={todoNameRef} type="text"></input>
     <button onClick={handleAddTodo}>Add Todo</button>
     <button>Clear Completed Todos</button>
     <div>0 left to do</div>
    </>
  )
}

export default App;
