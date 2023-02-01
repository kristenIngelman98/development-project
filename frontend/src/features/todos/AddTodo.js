import React, { useEffect, useState } from 'react'
import { addTodo } from './todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Label } from 'reactstrap';


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

export default function AddTodo() {
    const [todo, setTodo] = useState('')

    const dispatch = useDispatch();

    function handleAddTodo(event) {
        event.preventDefault();
        console.log(todo)

        if(todo.trim().length === 0) {
            alert("Please enter a task before adding!")
            setTodo("")
            return;
        }

        dispatch(
            addTodo({
                task: todo
            })
        );
        setTodo("")
    }
    return (
        <>
          <Input type="text" placeholder="" value={todo} onChange={(event) =>setTodo(event.target.value)}></Input>
          <Button onClick={handleAddTodo} variant="light">Add!</Button>
        </>
    )
}