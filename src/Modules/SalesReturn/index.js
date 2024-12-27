import React from 'react'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'
import { SalesEntryPage } from './Partials/SalesEntryPage'

const SalesReturn = ({ setSaleorder, getSaleorders, selectedDate }) => {
  return (
    <div>
      <TopTitle Heading={'Sales Return'} />
      <CustomCard>
        <SalesEntryPage setSaleorder={setSaleorder} getSaleorders={getSaleorders} selectedDate={selectedDate} />
      </CustomCard>

    </div>
  )
}

export default SalesReturn
