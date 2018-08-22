import React from "react"
import Comments from './Comments'
import CommentForm from './CommentForm'


class MySideEventDetails extends React.Component {

  componentDidMount () {
    this.props.mySelectedEvent
      ? document.getElementById("mySidenav").style.width = "550px"
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
          <p> <span role="img" aria-label="calendar">&#128197;{this.props.mySelectedEvent.local_date}</span></p>
          <p> <span role="img" aria-label="clock">&#128336;{this.props.mySelectedEvent.local_time}</span></p>
          <a
            href={mapLink}
            target="_blank">
            <span role="img"aria-label="pin">&#128205;</span>
              {this.props.mySelectedEvent.address}
          </a>
        </div>
       <p>{this.props.mySelectedEvent.description ? this.props.mySelectedEvent.description.replace(regex, " ") : ""}</p>
       <CommentForm
        ev={this.props.mySelectedEvent}
        current_user={this.props.current_user}
        addComment={this.props.addComment}/>
       <Comments
        comments={this.props.comments}
        ev={this.props.mySelectedEvent}/>
       <button onClick={() => {
         this.props.destroyMyEvent(this.props.mySelectedEvent)}}>Remove</button>
     </div>
   )
 }
}

export default MySideEventDetails
