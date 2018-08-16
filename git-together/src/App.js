import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
        <Sidebar />
        <Map />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
          <label>Topic:</label>
          <input type="text" name="topic" onChange={this.handleUserInput}/>
          <label>Location:</label>
          <input type="text" name="location" onChange={this.handleUserInput}/>
          <button onClick={this.getData}>Click it!!!</button>
      </div>
    );
  }
}

export default App;
