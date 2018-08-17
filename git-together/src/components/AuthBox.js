import React from 'react'

class AuthBox extends React.Component {
  render() {
    return (
      <div className="AuthBox">
        <label>Username:</label>
        <input type="text" name="username" onChange={this.props.handleUserInput}/>
        <label>Password:</label>
        <input type="text" name="password" onChange={this.props.handleUserInput}/>
        <button>Log in!</button>
      </div>
    )
  }
}

export default AuthBox
