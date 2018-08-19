import React from 'react'
import '../App.css'

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
        <p>
        <label>Topic:</label>
        <input type="text" name="topic" className="searchFormInput" onChange={this.handleUserInput}/>
        </p>

        <p>
        <label>Location:</label>
        <input type="text" name="location" className="searchFormInput" onChange={this.handleUserInput}/>
        </p>

        <p>
        <button onClick={(e) => {this.props.getEventData(e,this.state.topic, this.state.location)}}>Seach for events!</button>
        </p>
      </div>
    )
  }

}

export default SearchForm
