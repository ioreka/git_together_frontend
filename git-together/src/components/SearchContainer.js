import React from 'react'
import SearchForm from './SearchForm'



class SearchContainer extends React.Component {

  render(){
    return (
      <div>
        <SearchForm
          setCenter={this.props.setCenter}
          getEventData={this.props.getEventData}/>
      </div>
    )
  }
}

export default SearchContainer
