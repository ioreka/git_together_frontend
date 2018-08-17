
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

  sidebarOpen = () => {
    document.getElementById("mySidebar").style.display = "block";
  }

  sidebarClose = () => {
  document.getElementById("mySidebar").style.display = "none";
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
      <button class="w3-button w3-white w3-xxlarge" onClick={() => {
        document.getElementById("mySidebar").style.display == "block"
          ? this.sidebarClose()
          : this.sidebarOpen() }
        } > &#9776;
      </button>
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
