import React from 'react'

class SearchForm extends React.Component {

  render() {
    return (
      <div className="SearchForm">
        <label>Topic:</label>
        <input type="text" name="topic" onChange={this.props.handleUserInput}/>
        <label>Location:</label>
        <input type="text" name="location" onChange={this.props.handleUserInput}/>
        <button onClick={this.props.getData}>Seach for events!</button>
      </div>
    )
  }


}

export default SearchForm
