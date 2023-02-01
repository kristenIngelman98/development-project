import React from 'react'
import { format } from 'date-fns'

export default function TodaysDate(props) {
    const current_date = format(new Date(), "MMM d, y")
    const current_time = format(new Date(), "h:mm aaa")

    const last_updated = ""

    console.log("TIME", current_time)

    // function timeChange() {
    //     console.log('time has changed')
    // }
  return (
    <div>
      <p>Today is {current_date}</p>
      <p>{current_time}</p>
      <p>List last updated: {last_updated}</p>
    </div>
  )
}
