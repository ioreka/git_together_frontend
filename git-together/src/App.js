import React, { Component } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import MyEvents from './components/MyEvents'
import SideEventDetails from './components/SideEventDetails'



class App extends Component {
  state = {
    events:[],
    myEvents: false,
    selectedEvent: false
  }

  selectEvent = (e) => {
    this.setState({
      selectedEvent: e
    })
  }

  getEventData = (e, topic, location) => {
    console.log(e)
    console.log(topic)
    console.log(location)

    e.preventDefault()
    fetch(`http://localhost:3008/api/v1/getevents?topic=${topic}&location=${location}`)
    .then(r => r.json())
    .then(events => {
      console.log(events)
      this.setState({
        events: events
      })
    })
  }

  renderMapOrMyEvents = () => {
    if (!this.state.myEvents) {
      return (
        <Map
          selectEvent={this.selectEvent}
          selectedEvent={this.state.selectedEvent}
          events={this.state.events}
        />

      )
    }
    else {
      return (
         <MyEvents/>
      )
    }
  }

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          getEventData={this.getEventData}
          events={this.state.events}
        />
        {this.renderMapOrMyEvents()}
        {this.state.selectedEvent ? <SideEventDetails selectedEvent={this.state.selectedEvent} selectEvent={this.selectEvent}/> : null }
      </div>
    )
  }
}

export default App;
