
import React, { Component } from 'react';
import './App.css'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NotFound from './util/NotFound'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import MyEvents from './components/MyEvents'
import SideEventDetails from './components/SideEventDetails'
import { createUser } from './adapter/adapter'
import AuthAction from './auth/AuthAction'



class App extends Component {
  state = {
    current_user: null,
    events:[],
    myEvents: false,
    selectedEvent: false,
    filterBy:{
      today: false,
      tomorrow: false
    }
  }

  filterEvents = (e) => {
    let bool = e.target.checked
    let newFilter = {...this.state.filterBy}
    this.setState({
      filterBy: {...this.state.filterBy, [e.target.name] : e.target.checked}
    })
  }

  selectEvent = (e) => {
    this.setState({
      selectedEvent: e
    })
  }

  sidebarOpen = () => {
    document.getElementById("mySidebar").style.display = "block";
  }

  sidebarClose = () => {
  document.getElementById("mySidebar").style.display = "none";
}

addToMyEvents = (body) => {
  console.log(this.state.myEvents);


  // fetch('http://localhost:3008/api/v1/events', {
  //   method: "POST",
  //   headers: {
  //     "Content-type" : "application/json"
  //   },
  //   body: body
  // })
  // .then(r => console.log(r))
}

  getEventData = (e, topic, location) => {
    console.log(e)
    console.log(topic)
    console.log(location)

    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/getevents?topic=${topic}&location=${location}`)
    .then(r => r.json())
    .then(events => {
      console.log(events)
      this.setState({
        events: events
      })
    })
  }

  renderMapOrMyEvents = (filteredEvents) => {
    if (!this.state.myEvents) {
      return (
        <Map
          selectEvent={this.selectEvent}
          selectedEvent={this.state.selectedEvent}
          events={filteredEvents}
        />
      )
    }
    else {
      return (
         <MyEvents/>
      )
    }
  }

  filterTdy = () => {
    let f = [];
    this.state.events.forEach((ev) => {
      f.push()
      let x = ev.filter((e) => {
       var date = new Date();
       date.setDate(date.getDate());
       date.setHours(0,0,0,0)
       console.log("tdy", date)

       let mydate=new Date(e.local_date);
       mydate.setHours(0,0,0,0)
       console.log("thy", mydate)

       return mydate.getTime() === date.getTime()
     })
     f.push(x)
    })
    return f
  }

  filterTmr = () => {
    let f = [];
    this.state.events.forEach((ev) => {
      f.push()
      let x = ev.filter((e) => {
       var date = new Date();
       date.setDate(date.getDate() + 1);
       date.setHours(0,0,0,0)
       console.log("tmr", date)
       let mydate=new Date(e.local_date);
       mydate.setDate(mydate.getDate());
       mydate.setHours(0,0,0,0)
       console.log("tmr", mydate)

       return mydate.getTime() === date.getTime()
     })
     f.push(x)
    })
    return f
  }

 render() {
   let filteredEvents = this.state.events

   if (this.state.filterBy.today) {
     filteredEvents = this.filterTdy()
     console.log("Today", filteredEvents)
   }

   if (this.state.filterBy.tomorrow) {
     filteredEvents = this.filterTmr()
     console.log("Tmr", filteredEvents)

   }

   if(this.state.filterBy.today && this.state.filterBy.tomorrow){
     filteredEvents = [...this.filterTdy(), ...this.filterTmr()]
     console.log( console.log("TmrTdy", filteredEvents))
   }

    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => {
            return (
              <React.Fragment>
              <button className="w3-button w3-white w3-xxlarge" onClick={() => {
                document.getElementById("mySidebar").style.display === "block"
                ? this.sidebarClose()
                : this.sidebarOpen() }
              } > &#9776;
              </button>
              <Sidebar
              getEventData={this.getEventData}
              events={this.state.events}
              filterEvents={this.filterEvents}
              current_user={this.state.current_user}/>

              {this.renderMapOrMyEvents(filteredEvents)}
              {this.state.selectedEvent ? <SideEventDetails selectedEvent={this.state.selectedEvent} selectEvent={this.selectEvent} addToMyEvents={this.addToMyEvents}/> : null }
              </React.Fragment>
            )
          }} />
          <Route path="/signup" render={() => {
            return (<AuthAction header="Sign up!"/>)
          }} />
          <Route path="/login" render={() => {
            return(console.log('whaaaaaat'))
            // return (<AuthAction header="Log in!"/>)

          }} />
          <Route path="/404" component={NotFound} />
        </Switch>

      </div>
    )
  }
}

export default App;
