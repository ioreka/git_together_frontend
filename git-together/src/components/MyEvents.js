import React from 'react'
import EventList from './EventList'
import EventDetails from './EventDetails'


class MyEvents extends React.Component {

  state={
    myEvents: [],
    selectedEvent: ""
  }

  getMyEvents = () => {
  }

  selectEvent = (myEvent) => {
    this.setState({
      selectedEvent: myEvent
    })
  }

  componentDidMount() {
    this.getMyEvents()
  }
  render(){
    return (
      <div>
      { this.state.selectedEvent === ""
        ? <EventDetails selectedEvent={this.state.selectedEvent}/>
        : <EventList selectEvent={this.selectEvent} myEvents={this.state.myEvents}/>
      }
      </div>
    )
  }
}
export default MyEvents
