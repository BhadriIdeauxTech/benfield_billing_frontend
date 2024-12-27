import React from 'react'
import { PurchaseEntryPage } from './PurchaseEntry'
import { CustomCard } from '../../../../Components/CustomCard'
import { TopTitle } from '../../../../Components/Form/TopTitle'

const MainPurchaseentry = ({ getTaxType, getPurch, setSaleorder, getSaleorders, selectedDate }) => {
  return (
    <div>
      <TopTitle Heading={'Purchase'} />
      <CustomCard>
        <PurchaseEntryPage getTaxType={getTaxType} getPurch={getPurch} setSaleorder={setSaleorder} getSaleorders={getSaleorders} selectedDate={selectedDate} />
      </CustomCard>
    </div>
  )
}
export default MainPurchaseentry