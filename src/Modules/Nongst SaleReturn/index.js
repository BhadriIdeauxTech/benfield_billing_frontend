import React from 'react'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'
import { NonGst_SalesEntryPage } from './Partials/SalesEntryPage'

const NonGst_SalesReturn = ({ setSaleorder, getSaleorders, selectedDate }) => {
  return (
    <div>
      <TopTitle Heading={'Estimate Sale Return'}/>
      <CustomCard>
        <NonGst_SalesEntryPage setSaleorder={setSaleorder} getSaleorders={getSaleorders} selectedDate={selectedDate} />
      </CustomCard>

    </div>
  )
}

export default NonGst_SalesReturn
