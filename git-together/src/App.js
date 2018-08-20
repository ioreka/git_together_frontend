import React, { Component } from 'react';
import './App.css'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NotFound from './util/NotFound'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import MyEvents from './components/MyEvents'
import SideEventDetails from './components/SideEventDetails'
import {   createUser, loginUser, getCurrentUser, getUserEvents, setUserEvents } from './adapter/adapter'
import AuthAction from './auth/AuthAction'
import MySideEventDetails from './components/MySideEventDetails'





class App extends Component {
  state = {
    current_user: null,
    events:[],
    myEvents: [],
    selectedEvent: false,
    filterBy:{
      today: false,
      tomorrow: false
    },
    selectedDate: false,
    mySelectedEvent: false
  }

  addToMyEvents = (body) => {
    this.setState({
      myEvents: [...this.state.myEvents, body]
    })
  }

  postAuth = (data) => {
    if (data.error) {
      alert(data.error)
    } else {
      this.props.history.push('/search')
      localStorage.setItem('token', data.token)
      this.updateCurrentUser(data.token)
    }
  }

  signIn = (username, password) => {
    createUser(username, password).then(this.postAuth)
  }

  login = (username, password) => {
    loginUser(username, password).then(this.postAuth)
  }

  logOut = () => {
    this.setState({
      current_user: null
    })
    this.props.history.push('/login')
    localStorage.clear()
  }

  updateCurrentUser = (token) => {
    getCurrentUser(token).then(data => {
      // console.log(data)
      if (data.error) {
        this.logOut()
      } else {
        this.setState({
          current_user: data.username
        })
      }
    })
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.updateCurrentUser(localStorage.getItem('token'))
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

  selectMyEvent = (e) => {
    this.setState({
      mySelectedEvent: e
    })
  }

  sidebarOpen = () => {
    document.getElementById("mySidebar").style.display = "block";
  }

  sidebarClose = () => {
  document.getElementById("mySidebar").style.display = "none";
  }



  // fetch('http://localhost:3008/api/v1/events', {
  //   method: "POST",
  //   headers: {
  //     "Content-type" : "application/json"
  //   },
  //   body: body
  // })
  // .then(r => console.log(r))


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

  // renderMapOrMyEvents = (filteredEvents) => {
  //   if (!this.state.myEvents) {
  //     return (
  //       <Map
  //         selectEvent={this.selectEvent}
  //         selectedEvent={this.state.selectedEvent}
  //         events={filteredEvents}
  //       />
  //     )
  //   }
  //   else {
  //     return (
  //        <MyEvents/>
  //     )
  //   }
  // }

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

  selectDate = (date) => {
    this.setState({
      selectedDate:date
    })
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

  destroyMyEvent = (e) => {
    const myEventsCopy = [...this.state.myEvents]

    let index = myEventsCopy.indexOf(e)
      if (index > -1) {
        myEventsCopy.splice(index, 1)
      }
    this.setState({
      myEvents: myEventsCopy,
      mySelectedEvent: false
    })
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
          <Route path="/search" render={() => {
            return (
              <React.Fragment>
              <button className="w3-button w3-white w3-xxlarge" onClick={() => {
                document.getElementById("mySidebar").style.display === "block"
                ? this.sidebarClose()
                : this.sidebarOpen() }
              } > &#9776;
              </button>
              <Sidebar
                current_user={this.state.current_user}
                getEventData={this.getEventData}
                events={this.state.events}
                filterEvents={this.filterEvents}
                myEvents={this.state.myEvents}
                selectedDate={this.state.selectedDate}
                selectDate={this.selectDate}
                selectEvent={this.selectEvent}
                selectMyEvent={this.selectMyEvent}
                />

                <Map
                  selectEvent={this.selectEvent}
                  selectedEvent={this.state.selectedEvent}
                  events={filteredEvents}
                />
                {this.state.selectedEvent ?
                  <SideEventDetails
                    addToMyEvents={this.addToMyEvents}
                    selectedEvent={this.state.selectedEvent}
                    selectEvent={this.selectEvent}/>
                  : null
                }
                {this.state.mySelectedEvent ?
                  <MySideEventDetails
                    destroyMyEvent={this.destroyMyEvent}
                    mySelectedEvent={this.state.mySelectedEvent}
                    selectMyEvent={this.selectMyEvent}/>
                  : null
                }
              </React.Fragment>
            )
          }} />
          <Route path="/signup" render={() => {
            return (<AuthAction header="Sign up!" submit={this.signIn} />)
          }} />
          <Route path="/login" render={() => {
            return (<AuthAction header="Log in!" submit={this.login} />)
          }} />
          <Route path="/404" component={NotFound} />
          <Route path="/" render={() => {
             return (<Redirect to="/search" />)
           }} />
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
