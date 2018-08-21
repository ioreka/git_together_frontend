import React from 'react'


class Filter extends React.Component {

  render() {
    return (
      <div>
        <p>
          <input
          name="today"
          type="checkbox"
          onChange={(e) => {
            this.props.filterEvents(e)
          }
          }/>
          <label htmlFor="today">Today</label>
        </p>

        <p>
          <input
          name="tomorrow"
          type="checkbox"
          onChange={(e) => {
            this.props.filterEvents(e)
          }
          }/>
          <label htmlFor="tomorrow">Tomorrow</label>
        </p>
      </div>
    )
  }
}

export default Filter
