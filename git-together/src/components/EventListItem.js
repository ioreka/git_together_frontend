import React from 'react'

class EventListItem extends React.Component {

  render(){
    return (
            <div>
              <h2>MY EVENTS</h2>
              <h4 onClick={()=> {this.props.selectEvent(this.props.myEvent)}}>{this.props.myEvent.name}</h4>
              <p>{this.props.myEvent.date}</p>
              <button onClick={()=> {this.props.selectEvent("")}}>Back</button>
            </div>
    )
  }
}
export default EventListItem
