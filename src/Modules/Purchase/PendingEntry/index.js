import React from 'react'
import { PendingEntrys } from './Partials/PendingEntry'
import { CustomCard } from '../../../Components/CustomCard'
import { TopTitle } from '../../../Components/Form/TopTitle'

export const PurchasePendingEntryForm = ({ taxType, getPurch, productsForTable }) => {
  return (
    <div>
    
      <CustomCard>
        <PendingEntrys taxType={taxType} getPurch={getPurch} productsForTable={productsForTable} />
      </CustomCard>
    </div>
  )
}
