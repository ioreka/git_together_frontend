import React from 'react'

class AuthBox extends React.Component {

//do switch routing for this
//if this.props.currentUser
//   render() {
//     return (
//       <div className="AuthBox">
//         <label>Username:</label>
//         <input type="text" name="username" onChange={this.props.handleUserInput}/>
//         <label>Password:</label>
//         <input type="text" name="password" onChange={this.props.handleUserInput}/>
//         <button>Log in!</button>

  render () {
    return (
      //Do conditional rendering either welcome message or log/sign buttons
      <div id="authbox">
        <button>Sign up</button>
        <button>Login</button>
      </div>
    )
  }
}

export default AuthBox
