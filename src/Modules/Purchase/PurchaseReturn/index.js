import React from 'react'
import { PurchaseEntryPage } from './Partials/PurchseEntryPage'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const PurchaseReturn = ({ setSaleorder, getSaleorders, selectedDate }) => {
  return (
    <div>
      <TopTitle Heading={'Purchase Return'} />
      <CustomCard>
        <PurchaseEntryPage setSaleorder={setSaleorder} getSaleorders={getSaleorders} selectedDate={selectedDate} />
      </CustomCard>
    </div>
  )
}

export default PurchaseReturn