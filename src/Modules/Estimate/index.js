import React from 'react'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'
import { EstimateEntryPage } from './Partials/EstimateEntryPage'

const Estimate = () => {
  return (
    <div>
      <TopTitle Heading={'Quotation'} />
      <CustomCard>
        <EstimateEntryPage />
      </CustomCard>

    </div>
  )
}

export default Estimate