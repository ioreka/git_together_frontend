import React from 'react'


class Filter extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="inline-field">
          <input
          name="today"
          type="checkbox"
          onChange={(e) => {
            this.props.filterEvents(e)
          }
          }/>
          &ensp;
          <span>Today</span>
        </div>

        <div className="inline-field">
          <input
          name="tomorrow"
          type="checkbox"
          onChange={(e) => {
            this.props.filterEvents(e)
          }
          }/>
          &ensp;
          <span>Tomorrow</span>
        </div>

        <label htmlFor="dateFrom">From
         <input
          name="dateFrom"
          type="date"
          onChange={(e) => {
            this.props.filterEventsFromUntil(e)
          }
        }/>
        </label>

        <label htmlFor="dateUntil">Until
         <input
          name="dateUntil"
          type="date"
          onChange={(e) => {
            this.props.filterEventsFromUntil(e)
          }
        }/>
        </label>
      </React.Fragment>

    )
  }
}

export default Filter
