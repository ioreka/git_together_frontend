import React from 'react'

class AuthAction extends React.Component {
  render() {
    return (
    <React.Fragment>
    <h1>{this.props.header}</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" />
      </form>
    </React.Fragment>
  )
  }
}



export default AuthAction
