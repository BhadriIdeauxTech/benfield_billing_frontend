import React from 'react'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'
import { SalesEntryPageGst } from './Partials/SalesEntryPage'

const SalesEntryNonGst = () => {
  return (
    <div>
      <TopTitle Heading={'Estimate Sales'} />
      <CustomCard>
        <SalesEntryPageGst />
      </CustomCard>

    </div>
  )
}

export default SalesEntryNonGst
