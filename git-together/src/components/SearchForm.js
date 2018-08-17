import React from 'react'

class SearchForm extends React.Component {

  state= {
    topic: "",
    location: ""
  }

  handleUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <label>Topic:</label>
        <input type="text" name="topic" onChange={this.handleUserInput}/>
        <label>Location:</label>
        <input type="text" name="location" onChange={this.handleUserInput}/>
        <button onClick={(e) => {this.props.getEventData(e,this.state.topic, this.state.location)}}>Click it!!!</button>
      </div>
    )
  }

}

export default SearchForm
