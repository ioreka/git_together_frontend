import React from 'react'


class Filter extends React.Component {

  render() {
    return (
      <div>
        <label htmlFor="today">Today
           <input
            name="today"
            type="checkbox"
            onChange={(e) => {
              this.props.filterEvents(e)
            }
          }/>
        </label>

        <label htmlFor="tomorrow">Tomorrow
         <input
          name="tomorrow"
          type="checkbox"
          onChange={(e) => {
            this.props.filterEvents(e)
          }
        }/>
        </label>
      </div>
    )
  }
}

export default Filter
