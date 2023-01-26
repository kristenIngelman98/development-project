import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupText } from 'reactstrap';
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
  background: #1b263b;
  background: #0d1b2a;
  // border-radius: 10px;
  height: 100vh;
  color: white;
`;

const Button2 = styled.button`
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

const Input2 = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  margin-left: 0;
  background: pink;
  background: #e0e1dd;
  border: none;
  border-radius: 4px;
  width: 100%;

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
    <FontAwesomeIcon icon="fa-square-check" />
    <Wrapper>
      <Title>To Do List</Title>
      {/* <FontAwesomeIcon icon="coffee" size="6x" border /> */}
      <AddTodoSection>
      <Input2 type="text" placeholder="What do you need to get done?" ref={todoNameRef}></Input2>
      
      <Button2 onClick={handleAddTodo}>Add Todo</Button2>
      </AddTodoSection>

      <Label for="exampleEmail">What do you need to get done today?</Label>
      <InputGroup>
        <Input type="email" name="email" id="exampleEmail" placeholder="E.g. walk dog" />
          <Button>Add!</Button>
      </InputGroup>

      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <Button2 onClick={handleClearTodos}>Clear Completed Todos</Button2>
      <Button color="danger" outline>Clear Completed</Button>
      
     </Wrapper>
    </>
  )
}

export default App;