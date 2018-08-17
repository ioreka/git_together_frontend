import React from 'react'
import AuthBox from './AuthBox'
import SearchContainer from './SearchContainer'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="SearchBar">
        <AuthBox handleUserInput={this.props.handleUserInput} />
        <SearchContainer handleUserInput={this.props.handleUserInput} getData={this.props.getData}/>
      </div>
    )
  }
}

export default Sidebar
