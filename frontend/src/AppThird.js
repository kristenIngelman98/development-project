import React, { useState, useRef, useEffect } from 'react';
// import uuid from 'react-uuid'
import styled from 'styled-components';
import { Button, Label } from 'reactstrap';
import TodaysDate from './TodaysDate';
import axios from 'axios';
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from './features/counter/counterSlice';
import { todoAdded } from './features/todos/todosSlice';
import AddTodo from './features/todos/AddTodo';
import Intro from './features/header/Intro';
import TodoList from './features/todos/TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

// Styled Components 
const Wrapper = styled.section`
  padding: 4em;
  background: #1b263b;
  background: #0d1b2a;
  // height: 100vh;
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
  // using REDUX
//   const { count } = useSelector((state) => state.counter);
//   const dispatch = useDispatch();



  const [todos, setTodos] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    const initialValue = JSON.parse(saved)
    return initialValue || []
  });

  const [todo, setTodo] = useState(''); // is this needed?! yes
  const current_date = format(new Date(), "MMM d, y")
  const current_time = format(new Date(), "h:mm aaa")
  
  const [time, setTime] = useState(current_time)
  
  useEffect(() => {
    setInterval(() => setTime(format(new Date(), "h:mm aaa")), 30000)
  },[])

  const todoNameRef = useRef() // add comment about what this does

  // useEffect saves all todos to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    // localStorage.clear();
  }, [todos])

 
  function toggleTodo(id) {
    const newTodos = [...todos] // should never directly modify a state variable, always create a copy before modifying (use copy to modify state)
    console.log(newTodos)
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // get all todos - post request to API
  const getTodos = async () => {
    await axios.get(`http://localhost:8080/todos`)
    .then((response) => {
      const allTodos = response.data
      // update todos
      setTodos(allTodos)
    })
    .catch((err) => console.log(err))
  }

  const deleteSingleTodo = async (todo) => {
    // console.log(todo.id) // how am i getting this todo value, from the onclick?!

    await axios.delete(`http://localhost:8080/todo/${todo.id}`)
    console.log('item deleted:', todo)
    getTodos()
  }

  function handleAddTodo(e) {
    console.log(e)
    e.preventDefault();
    addPosts(todo);

    const name = todoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => [...prevTodos, { id: Math.random().toString(36).slice(2), name: name, completed: false}]) // need to recap on prevTodos, etc. and how they work
    todoNameRef.current.value = null
  }

  // delete all completed todos
  function handleClearTodos() {
    console.log('cleared todos', todos)
    const newTodos = todos.filter(todo => !todo.complete)
    console.log('newTODOS,', newTodos)
    console.log(todos[0].complete)
    // setTodos(newTodos)
  }

  // getting all todos from REST API
   useEffect(() => {
      getTodos()
   }, []);

   const addPosts = async (todo) => {
      fetch('http://localhost:8080/todo', {
         method: 'POST',
         body: JSON.stringify({
            todo: todo,
            completed: false,
            id: Math.random().toString(36).slice(2),
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((response) => response.json())
         .then((data) => {
          console.log('DATA AFTER POST REQ:', data)
            setTodos((todos) => [data, ...todos]);
            setTodo('');
         })
         .catch((err) => {
            console.log(err.message);
         });
   };

  return (
    <>
      {/* <TodaysDate /> */}
      {time}
      <Wrapper>
        <Intro />
        <AddTodoSection>
        {/* <Input type="text" placeholder="" ref={todoNameRef} value={todo} onChange={(e) => todoAdded(e.target.value)}></Input> */}
          {/* <Input type="text" placeholder="" ref={todoNameRef} value={todo} onChange={(e) =>setTodo(e.target.value)}></Input>
          <Button onClick={handleAddTodo} type="submit" variant="light">Add!</Button> */}
            <AddTodo />
            
        </AddTodoSection>
        <TodoList />
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        <Button onClick={handleClearTodos} color="danger">Clear Completed</Button>
      </Wrapper>
    </>
  )
}

export default App;