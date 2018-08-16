import React from 'react'
import EventListItem from './EventListItem'

class EventList extends React.Component {

  render(){
  const eventList = this.props.myEvents.map((myEvent) => {
      return <EventListItem selectEvent={this.props.selectEvent} myEvent={myEvent} />
    })
    return (
      <div>
        {eventList}
      </div>
    )
  }
}
export default EventList
