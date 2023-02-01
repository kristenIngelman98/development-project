import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { updatedDate, updatedTime } from './dateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Date() {
    const { date, time } = useSelector((state) => state.calcDate);
    const dispatch = useDispatch();

    useEffect(() => {
        
    })

    return (
        <div>
            <p>Today is {date}</p>
            <p>{time}</p>
            <p>List last updated: {}</p>
            <button onClick={() => dispatch(updatedTime())}>update date and time</button>
        </div>
    )
}