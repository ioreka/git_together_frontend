import React from "react"

class SideEventDetails extends React.Component {

  componentDidMount () {
    this.props.selectedEvent
      ? document.getElementById("mySidenav").style.width = "250px"
      : document.getElementById("mySidenav").style.width = "0"
  }

 render() {
   return (
     <div id="mySidenav" class="sidenav">
      <button className="closebtn" onClick={() => {this.props.selectEvent(false)}}>X</button>
       <a href={this.props.selectedEvent.link} target="_blank"><h4>Name: {this.props.selectedEvent.name}</h4></a>
       <h5>Group: {this.props.selectedEvent.group.name}</h5>
       <p>{this.props.selectedEvent.local_date} - {this.props.selectedEvent.local_time}</p>
       <p>Description: {this.props.selectedEvent.description}</p>
       <button onClick={() => {}}>Add to My Events</button>
     </div>
   )
 }
}

export default SideEventDetails
