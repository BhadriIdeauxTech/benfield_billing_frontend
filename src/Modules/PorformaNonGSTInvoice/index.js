import React from 'react'
import { EstimateProformaEntryPage } from './Partials/ProformaEntryPage'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'

const ProformaNonGSTMain = () => {


  return (
    <div>
      <TopTitle Heading={'Estimate Proforma Invoice'} />
      <CustomCard>
        <EstimateProformaEntryPage/>
      </CustomCard>
    </div>
  )
}

export default ProformaNonGSTMain