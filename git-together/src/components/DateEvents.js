import React from 'react'

const filterEvents = (selectMyEvent, selectedDate, myEvents) => {
  let events = myEvents.filter((ev) => {
    let nD = new Date(ev.local_date)
    nD.setHours(0,0,0,0)

    let sD = new Date(selectedDate)
    sD.setHours(0,0,0,0)
    console.log("bool", nD.getTime() === sD.getTime())
    console.log("nD",nD.getTime());
    console.log("sD",sD.getTime());

    return nD.getTime() === sD.getTime()
  }).map((e) => {
    return <p onClick={() => {selectMyEvent(e)}}>{e.name} - {e.time}</p>
  })
  return events
}

const DateEvents = ({ selectMyEvent, selectedDate, myEvents }) => {
  return(
    <div>
      {filterEvents(selectMyEvent,selectedDate, myEvents)}
    </div>
  )
}

export default DateEvents
