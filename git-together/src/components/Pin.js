import React from 'react'


class Pin extends React.Component {

  render() {
    return (
      <img
        style={{cursor: "pointer"}}
        onClick={() => this.props.selectEvent(this.props.ev)}
        src="/maps-and-flags-32.png"
        alt=""/>
    )
  }
}

export default Pin
