import React from 'react'
import AuthBox from './AuthBox'
import SearchContainer from './SearchContainer'
import Filter from './Filter'
import DateEvents from './DateEvents'
import Calendar from 'react-calendar'
import '../App.css'


class Sidebar extends React.Component {

  state = {
    date: new Date()
  }

  onChange = (date) => {
    console.log(date)
    this.setState({
      date
    },()=>{this.props.selectDate(date)})
  }

  componentDidUpdate(){
    this.displayMyEvents()
  }

  componentDidMount(){
    this.displayMyEvents()
  }

  displayMyEvents=() =>{
    let timeNodes = document.querySelectorAll('time')

     timeNodes.forEach((timeNode) => {
       let calendarTime = new Date(timeNode.dateTime)
      if(this.props.myEvents.find((e) => {
        let newTime = new Date(e.local_date)
        newTime.setHours(0,0,0,0)
        return calendarTime.getTime() === newTime.getTime()
      }))
      {
        console.log("WOOOOOWOWOWOWOWOWOWOWOWOW")
        timeNode.style.color = "green"
      }
    })
  }

  render() {

    var currentTime = new Date()
    currentTime.setHours(0,0,0,0)
    currentTime =  currentTime.getTime()
    return (
      <div id="sidebar" className="w3-sidebar w3-bar-block w3-dark-grey w3-animate-left" styles="display:none" id="mySidebar">
        <AuthBox
          current_user={this.props.current_user}
          logOut={this.props.logOut}
        />
        <SearchContainer
          events={this.props.events}
          getEventData={this.props.getEventData}
        />
        <Filter
          filterEvents={this.props.filterEvents}/>
        My events:
        <Calendar style={this.state.date.getTime() == currentTime ? {color:"green"} : null }
          onChange={this.onChange}
          onActiveDateChange={this.displayMyEvents}
          value={this.state.date}
          myEvents={this.props.myEvents}/>
        <DateEvents
          selectMyEvent={this.props.selectMyEvent}
          myEvents={this.props.myEvents}
          selectedDate={this.props.selectedDate}/>
      </div>

    )
  }
}

export default Sidebar
