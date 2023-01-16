import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { formatDistance, subDays } from 'date-fns'

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
// //=> "3 days ago"

// formatDistance()

const LOCAL_STORAGE_KEY = 'todoApp.todos'

// Styled Components 
const Title = styled.h1`
  font-size: 1.em;
  text-align: center;
  color: palevioletred;
  text-transform: uppercase;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  background: black;
  border-radius: 10px;
  height: 87vh;
  color: white;
`;

const Button = styled.button`
  background-color: #555555;
  border: 2px solid #555555;
  color: white;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #fff;
    color: #555555;
  }
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  margin-left: 0;
  background: pink;
  border: none;
  border-radius: 4px;
  width: 50%;
  max-width:600px;

  ::placeholder {
    color: palevioletred;
  }
`;

const AddTodoSection = styled.section`
  text-align: center;
`;


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
    setTodos(prevTodos => [...prevTodos, { id: uuid(), name: name, complete: false}])
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)

  }

  return (
    <>
    <Wrapper>
      <Title>To Do List <FontAwesomeIcon icon="coffee" /></Title>
      <AddTodoSection>
      <Input type="text" placeholder="What do you need to get done?" ref={todoNameRef}></Input>
      <Button onClick={handleAddTodo}>Add Todo</Button>
      </AddTodoSection>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <Button onClick={handleClearTodos}>Clear Completed Todos</Button>
      <FontAwesomeIcon icon="check-square" />

     </Wrapper>
    </>
  )
}

export default App;