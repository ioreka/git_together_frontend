import React from 'react'
import GoogleMapReact from 'google-map-react'
import Pin from './Pin'

class Map extends React.Component {


  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }
  //
  // setPins = () => {
  //   let pins = this.props.events.forEach((e) => {
  //       console.log("e", e)
  //       return e.map((ev) => {
  //         console.log("ev", e)
  //         return <Pin lat={ev.venue.lat} lon={ev.venue.lon} />
  //       })
  //     })
  //   this.setState({
  //     pins: pins
  //   })
  // }



  // componentDidMount() {
  //   this.setPins()
  // }

  render() {
    let pin = this.props.events[0]
    console.log(pin)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAhlNg9SyzsjkZk-9rTBDC8BthNPMbH-uc"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
