import React from 'react'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'
import { EstimateEntryPagenongst } from './Partials/EstimateEntryNonGST'

const EstimateNongst = () => {
  return (
    <div>

      <TopTitle Heading={'Estimate / Quotation'} />
      <CustomCard>
        <EstimateEntryPagenongst />
      </CustomCard>

    </div>
  )
}

export default EstimateNongst