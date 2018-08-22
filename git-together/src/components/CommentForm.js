import React from 'react'
import '../App.css'

class CommentForm extends React.Component {

  state= {
    comment:""
  }

  handleUserInput = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  render() {
    const comment = {comment: this.state.comment, username:this.props.current_user.username, user_id:this.props.current_user.id, event_id:this.props.ev.id, meetup_id: this.props.ev.meetup_id}
    return (
      <div>
        <label>Comment:</label>
        <input type="text" name="comment" value={this.state.comment} className="searchFormInput" onChange={this.handleUserInput}/>
        <button onClick={(e) => {
          this.props.addComment(comment)
        }}>Add Comment</button>
      </div>
    )
  }

}

export default CommentForm
