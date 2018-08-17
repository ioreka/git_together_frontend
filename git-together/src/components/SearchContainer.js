import React from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'


class SearchContainer extends React.Component {
  render(){
    return (
      <div>
        <SearchForm
          getEventData={this.props.getEventData}/>
        <SearchResults
          events={this.props.events}/>
      </div>
    )
  }
}

export default SearchContainer
