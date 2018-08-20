import React from "react"

class SideEventDetails extends React.Component {

  componentDidMount () {
    this.props.selectedEvent
      ? document.getElementById("mySidenav").style.width = "250px"
      : document.getElementById("mySidenav").style.width = "0"
  }

 render() {
   const regex = /(<([^>]+)>)/ig
   const mapLink = this.props.selectedEvent.venue ?
   `http://maps.google.com/?q=${this.props.selectedEvent.venue.address_1}+${this.props.selectedEvent.venue.city}` :
   `http://maps.google.com/?q=${this.props.selectedEvent.group.localized_location}`


   let body = {name: this.props.selectedEvent.name,
               group_name: this.props.selectedEvent.group.name,
               description: this.props.selectedEvent.description,
               date: this.props.selectedEvent.local_date,
               time: this.props.selectedEvent.local_time,
               venue_address: this.props.selectedEvent.venue_address,
               meetup_id: this.props.selectedEvent.meetup_id}


   return (
     <div id="mySidenav" class="sidenav">
      <button className="closebtn" onClick={() => {this.props.selectEvent(false)}}><img style={{cursor:"pointer"}}src="./left-arrow.png"/></button>
       <a href={this.props.selectedEvent.link} target="_blank"><h4>{this.props.selectedEvent.name}</h4></a>
       <h5>Group: {this.props.selectedEvent.group.name}</h5>
        <div>
          <p>{this.props.selectedEvent.local_date} - {this.props.selectedEvent.local_time}</p>
          <a
            href={mapLink}
            target="_blank">
            <img src="./Maps-icon-16.png"/>
              {this.props.selectedEvent.venue ? this.props.selectedEvent.venue.address_1 : this.props.selectedEvent.group.localized_location}
              {this.props.selectedEvent.venue ? this.props.selectedEvent.venue.city : null}</a>
        </div>
       <p>{this.props.selectedEvent.description ? this.props.selectedEvent.description.replace(regex, " ") : ""}</p>
       <button onClick={() => {this.props.addToMyEvents(body)}}>Add to My Events</button>
     </div>
   )
   return (
     <div id="mySidenav" class="sidenav">
       <button onClick={() => {this.props.addToMyEvents(body)}}>Add to My Events</button>
     </div>
   )

 }
}

export default SideEventDetails
