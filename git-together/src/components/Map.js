import React from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends React.Component {
  render() {
    return (
      <div className="Map">


  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {
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
