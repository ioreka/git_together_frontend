import React from 'react'
import AuthBox from './AuthBox'
import SearchContainer from './SearchContainer'

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <AuthBox />
        <SearchContainer
          events={this.props.events}
          getEventData={this.props.getEventData}
        />
      </div>  
    )
  }
}

export default Sidebar
