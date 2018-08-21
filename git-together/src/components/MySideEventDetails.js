import React from "react"

class MySideEventDetails extends React.Component {

  componentDidMount () {
    this.props.mySelectedEvent
      ? document.getElementById("mySidenav").style.width = "250px"
      : document.getElementById("mySidenav").style.width = "0"
  }

 render() {
   const regex = /(<([^>]+)>)/ig

   const mapLink = `http://maps.google.com/?q=${this.props.mySelectedEvent.address}`

   return (
     <div id="mySidenav" class="sidenav">
      <button className="closebtn" onClick={() => {this.props.selectMyEvent(false)}}><img style={{cursor:"pointer"}}src="./left-arrow.png" alt=""/></button>
       <a href={this.props.mySelectedEvent.meetup_link} target="_blank"><h4>{this.props.mySelectedEvent.name}</h4></a>
       <h5>Group: {this.props.mySelectedEvent.group_name}</h5>
        <div>
          <p>{this.props.mySelectedEvent.local_date} - {this.props.mySelectedEvent.local_time}</p>
          <a
            href={mapLink}
            target="_blank">
            <img src="./Maps-icon-16.png" alt=""/>
              {this.props.mySelectedEvent.address}
          </a>
        </div>
       <p>{this.props.mySelectedEvent.description ? this.props.mySelectedEvent.description.replace(regex, " ") : ""}</p>
       <button onClick={() => {this.props.destroyMyEvent(this.props.mySelectedEvent)}}>Remove</button>
     </div>
   )
 }
}

export default MySideEventDetails
