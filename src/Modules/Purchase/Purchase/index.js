import React from 'react'
import { PurchaseEntryPage } from './Partials/PurchseEntryPage'
import { CustomCard } from '../../../Components/CustomCard'
import { TopTitle } from '../../../Components/Form/TopTitle'

const Purchase = ({ setSaleorder, getSaleorders, selectedDate }) => {
  return (
    <div>
      <TopTitle Heading={'Purchase'} />
      <CustomCard>
        <PurchaseEntryPage setSaleorder={setSaleorder} getSaleorders={getSaleorders} selectedDate={selectedDate} />
      </CustomCard>
    </div>
  )
}

export default Purchase