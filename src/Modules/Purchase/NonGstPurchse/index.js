import React from 'react'
import { PurchaseEntryPageEstimate } from './Partials/PurchseEntryPage'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const NonGSRPurchase = ({ setSaleorder, getSaleorders, selectedDate }) => {
    return (
        <div>
            <TopTitle Heading={'Estimate Purchase'} />
            <CustomCard>
                <PurchaseEntryPageEstimate setSaleorder={setSaleorder} getSaleorders={getSaleorders} selectedDate={selectedDate} />
            </CustomCard>
        </div>
    )
}

export default NonGSRPurchase