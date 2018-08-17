
import React, { Component } from 'react';
import './App.css'

import Sidebar from './components/Sidebar'
import Map from './components/Map'
import MyEvents from './components/MyEvents'


class App extends Component {
  state = {
    events:[],
    myEvents: false
  }

  getData = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/getevents?topic=${this.state.topic}&location=${this.state.location}`)
    .then(r => r.json())
    .then(events => {
      this.setState({
        events: events
      })
    })
  }

  renderMapOrMyEvents = () => {
    if (!this.state.myEvents) {
      return (
        <Map
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

 render() {
    return (
      <div className="App">
      <Sidebar
        getEventData={this.getEventData}
        events={this.state.events}
      />
        {this.renderMapOrMyEvents()}
      </div>
    )
  }
}

export default App;
