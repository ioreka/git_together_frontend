import React from 'react'
import GoogleMapReact from 'google-map-react'
import Pin from './Pin'

class Map extends React.Component {

  state = {
    zoom: 13
  }

  render() {
    let pins = []
    if (this.props.events.length > 0){
      this.props.events.forEach((e) => {
        // console.log(e)
        e.map((ev) => {
          // console.log("ev",ev)
          pins.push(<Pin
            selectedEvent={this.props.selectedEvent}
            selectEvent={this.props.selectEvent}
            ev={ev}
            lat={ev.venue ? ev.venue.lat : ev.group.lat}
            lng={ev.venue ? ev.venue.lon : ev.group.lon}
            name={ev.name}
            key={ev.name}/>)
        })
      })
    }

    return (
      <React.Fragment>
      <div className="w3-container">
          <div style={{ height: '95vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyAhlNg9SyzsjkZk-9rTBDC8BthNPMbH-uc"}}
              defaultCenter={this.props.center}
              center={this.props.center}
              defaultZoom={this.state.zoom}
            >
              {pins}
            </GoogleMapReact>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Map
