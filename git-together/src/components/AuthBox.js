import React from 'react'
import { Link } from 'react-router-dom'


class AuthBox extends React.Component {

  render () {
    return (
      <div id="authbox">

            { this.props.current_user?
              //if current_user is true, renders a welcome message
              <div>
                Welcome,{this.props.current_user.name}!<br/>
                <Link onClick={this.props.logOut} to="#">Log out</Link>
              </div>
              :
              //if current_user is false, render the two links
              <React.Fragment>
                <Link to="/signup">Sign up</Link>
                <Link to="/login">Login</Link>
              </React.Fragment>
            }

      </div>
    )
  }
}

export default AuthBox
