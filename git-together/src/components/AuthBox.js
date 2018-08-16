import React from 'react'

class AuthBox extends React.Component {
  render () {
    return (
      //Do conditional rendering either welcome message or log/sign buttons
      <div>
        <button>Sign up</button>
        <button>Login</button>
      </div>
    )
  }
}

export default AuthBox
