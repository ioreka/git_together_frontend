import React from "react"

class SideEventDetails extends React.Component {

  componentDidMount () {
    this.props.selectedEvent
      ? document.getElementById("mySidenav").style.width = "550px"
      : document.getElementById("mySidenav").style.width = "0"
  }

 render() {
   const regex = /(<([^>]+)>)/ig

   const getAddress = () => {
     let address = ""
     this.props.selectedEvent.venue ?
     address = `${this.props.selectedEvent.venue.address_1} ${this.props.selectedEvent.venue.city}` :
     address = this.props.selectedEvent.group.localized_location
     console.log("selectedevent:", this.props.selectedEvent);
     return address
   }

   const mapLink = `http://maps.google.com/?q=${getAddress()}`


   let body = {name: this.props.selectedEvent.name,
               group_name: this.props.selectedEvent.group.name,
               description: this.props.selectedEvent.description,
               local_date: this.props.selectedEvent.local_date,
               local_time: this.props.selectedEvent.local_time,
               address: getAddress(),
               meetup_id: this.props.selectedEvent.id,
               meetup_link: this.props.selectedEvent.link
              }


   return (
     <div id="mySidenav" className="sidenav">
      <button className="closebtn" onClick={() => {this.props.selectEvent(false)}}><img style={{cursor:"pointer"}}src="./left-arrow.png" alt=""/></button>
       <a href={this.props.selectedEvent.link} target="_blank"><h4>{this.props.selectedEvent.name}</h4></a>
       <h5>Group: {this.props.selectedEvent.group.name}</h5>
        <div>
          <p> <span role="img" aria-label="calendar">&#128197;{this.props.selectedEvent.local_date}</span></p>
          <p> <span role="img" aria-label="clock">&#128336;{this.props.selectedEvent.local_time}</span></p>
          <a
            href={mapLink}
            target="_blank">
            <span role="img"aria-label="pin">&#128205;</span>
              {this.props.selectedEvent.venue ? this.props.selectedEvent.venue.address_1 : this.props.selectedEvent.group.localized_location}
              {this.props.selectedEvent.venue ? this.props.selectedEvent.venue.city : null}</a>
        </div>
       <p>{this.props.selectedEvent.description ? this.props.selectedEvent.description.replace(regex, " ") : ""}</p>
       <button id="addOrRemoveButton" onClick={() => {this.props.addToMyEvents(body)}}>Add to My Events</button>
     </div>
   )
 }
}

export default SideEventDetails
