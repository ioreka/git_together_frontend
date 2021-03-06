import React, { Component } from 'react';
import './App.css'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NotFound from './util/NotFound'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import SideEventDetails from './components/SideEventDetails'
import {   setEventComment, getEventComments, createUser, loginUser, getCurrentUser, getUserEvents, setUserEvents, deleteFromMyEventsList } from './adapter/adapter'
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
      tomorrow: false,
      dateFrom: false,
      dateUntil:false
    },
    selectedDate: false,
    mySelectedEvent: false,
    previouslySeenUser: null,
    center: {
      lat: 51.509865,
      lng: 0.118092
    },
    comments:[]
  }
/////////////////////////////

setComments = (comment) => {
  setEventComment(this.state.current_user.id, localStorage.getItem('token'), comment)
  .then(new_comment => {
    this.setState({
      comments: [...this.state.comments, new_comment]
    })
  })
}

  addComment=(comment) => {
    this.setComments(comment)
  }

  fetchMyEvents = () => {
    if (this.state.current_user && this.state.current_user !== this.state.previouslySeenUser) {
      getUserEvents(this.state.current_user.id, localStorage.getItem('token'))
      .then(events => {
        this.setState({
          myEvents: events,
          previouslySeenUser: this.state.current_user
        })
      })
    }
  }

  setEvents = () => {
    setUserEvents(this.state.current_user.id, localStorage.getItem('token'), this.state.myEvents).then(new_events => {
      this.setState({
        myEvents: new_events
      })
    })
  }


  deleteAndSetMyEvents = (event) => {
    deleteFromMyEventsList(this.state.current_user.id, localStorage.getItem('token'), event).then(new_events => {
      this.setState({
        myEvents: new_events
      })
    })
  }


  addToMyEvents = (event) => {
    if (this.state.current_user) {
      if (!this.state.myEvents.includes(event)) {
        this.setState({
            myEvents: [...this.state.myEvents, event]
        },() => {
          this.setEvents()
          this.setState({
            selectedEvent: null
          })
          alert("Event added to calendar")
        })
      }
      else {
        alert("This event is already in your calendar")
      }
    } else {
      alert("You have to be logged in to do that!")
      this.setState({
        selectedEvent: false
      })
    }
    }


  destroyMyEvent = (event) => {
    this.setState(prevState => {
      prevState.myEvents.splice(prevState.myEvents.indexOf(event), 1)
      return {
        myEvents: prevState.myEvents
      }
    }, () => {
      this.deleteAndSetMyEvents(event)
      this.setState({
        selectedEvent: null
      })
      alert("Event removed from calendar")
    })
  }





  /////////////////////////////


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
      if (data.error) {
        this.logOut()
      } else {
        this.setState({
          current_user: data
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
    this.setState({
      filterBy: {...this.state.filterBy, [e.target.name] : e.target.checked}
    })
  }

  filterEventsFromUntil = (e) => {
    this.setState({
      filterBy: {...this.state.filterBy, [e.target.name] : e.target.value}
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
    }, () => {

      getEventComments(this.state.current_user.id, localStorage.getItem('token'),this.state.mySelectedEvent.meetup_id)
      .then(comments => {
        this.setState({
          comments: comments
        })
      })
    })
  }

  sidebarOpen = () => {
    document.getElementById("mySidebar").style.display = "block";
  }

  sidebarClose = () => {
  document.getElementById("mySidebar").style.display = "none";
  }

  getEventData = (e, topic, location) => {
    e.preventDefault()
    fetch(`http://localhost:3008/api/v1/getevents?topic=${topic}&location=${location}`)
    .then(r => r.json())
    .then(events => {
      this.setState({
        events: events
      })
    })
  }

  setCenter = (address) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAhlNg9SyzsjkZk-9rTBDC8BthNPMbH-uc`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
      center: {lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng }
    })
  })
  }

  filterTdy = () => {
    let f = [];
    this.state.events.forEach((ev) => {
      let x = ev.filter((e) => {
       var date = new Date();
       date.setDate(date.getDate());
       date.setHours(0,0,0,0)

       let mydate=new Date(e.local_date);
       mydate.setHours(0,0,0,0)

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
      let x = ev.filter((e) => {
       var date = new Date();
       date.setDate(date.getDate() + 1);
       date.setHours(0,0,0,0)
       let mydate=new Date(e.local_date);
       mydate.setDate(mydate.getDate());
       mydate.setHours(0,0,0,0)

       return mydate.getTime() === date.getTime()
     })
     f.push(x)
    })
    return f
  }

  filterFrom = () => {
    let f = [];
    this.state.events.forEach((ev) => {
      let x = ev.filter((e) => {
       var date = new Date(this.state.filterBy.dateFrom);
       date.setDate(date.getDate());
       date.setHours(0,0,0,0)
       let mydate=new Date(e.local_date);
       mydate.setDate(mydate.getDate());
       mydate.setHours(0,0,0,0)
       console.log("date frm form", date)
       console.log("date frm event", mydate)
       console.log("event date is after selected date",mydate.getTime() >= date.getTime());
       return mydate.getTime() >= date.getTime()
     })
     f.push(x)
    })
    return f
  }

  filterUntil = () => {
    let f = [];
    this.state.events.forEach((ev) => {
      let x = ev.filter((e) => {
       var date = new Date(this.state.filterBy.dateUntil);
       date.setDate(date.getDate());
       date.setHours(0,0,0,0)
       let mydate=new Date(e.local_date);
       mydate.setDate(mydate.getDate());
       mydate.setHours(0,0,0,0)
       console.log("date frm form", date)
       console.log("date frm event", mydate)
       console.log("event date is before selected date",mydate.getTime() <= date.getTime());

       return mydate.getTime() <= date.getTime()
     })
     f.push(x)
    })
    return f
  }

  filterByDatePickers = () => {
    let f = [];
    this.state.events.forEach((ev) => {
      let x = ev.filter((e) => {
        let dateFrom = new Date(this.state.filterBy.dateUntil);
        let dateUntil = new Date(this.state.filterBy.dateUntil);
        dateFrom.setDate(dateFrom.getDate());
        dateFrom.setHours(0,0,0,0)
        dateUntil.setDate(dateUntil.getDate());
        dateUntil.setHours(0,0,0,0)
       let mydate=new Date(e.local_date);
       mydate.setDate(mydate.getDate());
       mydate.setHours(0,0,0,0)
       // console.log("date frm form", date)
       // console.log("date frm event", mydate)
       // console.log("event date is before selected date",mydate.getTime() <= date.getTime());

       return mydate.getTime() >= dateFrom.getTime() && mydate.getTime() <= dateUntil.getTime()
     })
     f.push(x)
    })
    return f
  }


  // destroyMyEvent = (e) => {
  //   const myEventsCopy = [...this.state.myEvents]
  //
  //   let index = myEventsCopy.indexOf(e)
  //     if (index > -1) {
  //       myEventsCopy.splice(index, 1)
  //     }
  //   this.setState({
  //     myEvents: myEventsCopy,
  //     mySelectedEvent: false
  //   })
  // }

 render() {
   this.fetchMyEvents()
   let filteredEvents = this.state.events

   if (this.state.filterBy.today) {
     filteredEvents = this.filterTdy()
   }

   if (this.state.filterBy.tomorrow) {
     filteredEvents = this.filterTmr()
   }

   if(this.state.filterBy.today && this.state.filterBy.tomorrow){
     filteredEvents = [...this.filterTdy(), ...this.filterTmr()]
   }

   if (this.state.filterBy.dateFrom) {
     filteredEvents = this.filterFrom()
   }

   if (this.state.filterBy.dateUntil) {
     filteredEvents = this.filterUntil()
   }

   if (this.state.filterBy.dateFrom && this.state.filterBy.dateUntil) {
    filteredEvents = this.filterByDatePickers()
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
                setCenter={this.setCenter}
                current_user={this.state.current_user}
                getEventData={this.getEventData}
                events={this.state.events}
                filterEvents={this.filterEvents}
                myEvents={this.state.myEvents}
                selectedDate={this.state.selectedDate}
                selectDate={this.selectDate}
                selectEvent={this.selectEvent}
                selectMyEvent={this.selectMyEvent}
                logOut={this.logOut}
                filterEventsFromUntil={this.filterEventsFromUntil}
                />

                <Map
                  center={this.state.center}
                  selectEvent={this.selectEvent}
                  selectedEvent={this.state.selectedEvent}
                  events={filteredEvents}
                />
                {this.state.selectedEvent ?
                  <SideEventDetails
                    addToMyEvents={this.addToMyEvents}
                    selectedEvent={this.state.selectedEvent}
                    addComment={this.addComment}
                    current_user={this.state.current_user}
                    selectEvent={this.selectEvent}/>
                  : null
                }
                {this.state.mySelectedEvent ?
                  <MySideEventDetails
                    addComment={this.addComment}
                    comments={this.state.comments}
                    current_user={this.state.current_user}
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
