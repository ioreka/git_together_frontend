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
        }/>
        </label>
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
      </div>
    )
  }
}

export default Filter
