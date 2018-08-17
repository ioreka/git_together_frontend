import React from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'


class SearchContainer extends React.Component {
  render() {
    return (
      <div className="SearchContainer">
        <SearchForm handleUserInput={this.props.handleUserInput} getData={this.props.getData}/>
        <SearchResults />
      </div>
    )
  }
}

export default SearchContainer
