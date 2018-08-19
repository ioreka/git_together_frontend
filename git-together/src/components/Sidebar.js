import React from 'react'
import AuthBox from './AuthBox'
import SearchContainer from './SearchContainer'
import Filter from './Filter'

import Calendar from 'react-calendar'
import '../App.css'


class Sidebar extends React.Component {

  state = {
    date: new Date()
  }

  onChange = (date) => {
    this.setState({
      date
    })
  }

  render() {
    return (
      <div id="sidebar" className="w3-sidebar w3-bar-block w3-dark-grey w3-animate-left" styles="display:none" id="mySidebar">
        <AuthBox current_user={this.props.current_user}/>
        <SearchContainer
          events={this.props.events}
          getEventData={this.props.getEventData}
        />
        <Filter
          filterEvents={this.props.filterEvents}/>
        My events:
        <Calendar
          onChange={this.onChange}
          value={this.state.date}/>
      </div>

    )
  }
}

export default Sidebar
