import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux';
import { deleteTodo } from './todosSlice';

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-top: 0 !important;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #e0e1dd;
    border-radius: 100%;
    
    &:after {
      content: "";
      position: absolute;
      display: none;

    }
  }

  .checkmark:after {
    left: 10px;
    top: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #c9184a;
  }
`;

const ToDoWrapper = styled.div`
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const TrashCanWrapper = styled.div` 
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;

  svg {
    color: #c9184a;
  }
`;

export default function TodoItem({ id, title, todo }) {
    const dispatch = useDispatch()

    function removeItem() {
        dispatch(
            deleteTodo({
                id: id
            })
        )
    }
  function handleTodoClick() {
    console.log('todo is checked off')
    // if checked, add to array, if checked again, remove from array***
    // loop through array for bulk delete and add another reducer func in todoSlice**
  }

  return (
    <ToDoWrapper>
      <Label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.todo || todo.name || title}
        <span className="checkmark"></span>
      </Label>
      <TrashCanWrapper>
          <FontAwesomeIcon icon="fa-trash-can" onClick={() => removeItem()} />
        </TrashCanWrapper>
    </ToDoWrapper>
  )
}