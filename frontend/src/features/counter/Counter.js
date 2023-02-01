import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice'

export default function Counter() {
    const { count, name } = useSelector((state) => state.counter);
    const dispatch = useDispatch();

  return (
    <div className="App">
        <h1> The count is: {count}</h1>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        {/* <button onClick={() => dispatch(incrementByAmount(33))}> */}
        <button onClick={() => dispatch(incrementByAmount("hello"))}>
        Show new name state
        </button>
        <p>{name}</p>
    </div>
  )
}