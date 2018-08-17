import React, { Component } from 'react';

import Sidebar from './components/Sidebar'
import Map from './components/Map'


class App extends Component {
  state = {
    topic: "",
    location: "",
    searchTerm: []
  }

  getData = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/getevents?topic=${this.state.topic}&location=${this.state.location}`)
    .then(r => r.json())
    .then(r => console.log(r))
  }

  handleUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <Sidebar handleUserInput={this.handleUserInput} getData={this.getData}/>
        <Map />
      </div>
    );
  }
}

export default App;
