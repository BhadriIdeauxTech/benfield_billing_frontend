import React from 'react'
import Daybook from './Partials/Daybook'

const DayBookMain = ({getDaybook, setDaybook}) => {
  return (
    <div>
        <Daybook  getDaybook={getDaybook} setDaybook={setDaybook} />
    </div>
  )
}

export default DayBookMain