import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Label } from 'reactstrap';
import TodaysDate from './TodaysDate';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

// Styled Components 
const Title = styled.h1`
  font-size: 1.em;
  text-align: center;
  color: palevioletred;
  // text-transform: uppercase;
  font-family: 'Pacifico', cursive;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: #1b263b;
  background: #0d1b2a;
  height: 100vh;
  color: white;

  Button {
    padding: 10px;
    margin-top: 15px;
  }

  Label {
    margin-bottom: 0;
    margin-top: 20px;
  }
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  margin-left: 0;
  background: pink;
  background: #e0e1dd;
  border: none;
  border-radius: 4px;
  // width: 80%;

  ::placeholder {
    color: palevioletred;
  }
`;

const AddTodoSection = styled.section`
  display: grid;
  grid-template-columns: 4fr 1fr;

  Button {
    margin: 10px 0 10px 0;
  }
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
    <TodaysDate />
    <Wrapper>
    
      <Title>To Do List</Title>
      {/* <FontAwesomeIcon icon="coffee" size="6x" border /> */}
      <Label>What do you need to get done today?</Label>
      
      <AddTodoSection>
        <Input type="text" placeholder="" ref={todoNameRef}></Input>
        <Button onClick={handleAddTodo} variant="light">Add!</Button>
      </AddTodoSection>


      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <Button onClick={handleClearTodos} color="danger">Clear Completed</Button>
     </Wrapper>
    </>
  )
}

export default App;