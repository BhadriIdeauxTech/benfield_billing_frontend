import React from 'react'
import { ProformaEntryPage } from './Partials/ProformaEntryPage'
import { CustomCard } from '../../Components/CustomCard'
import { TopTitle } from '../../Components/Form/TopTitle'

const ProformaMain = () => {


  return (
    <div>
      <TopTitle Heading={'Proforma Invoice'} />
      <CustomCard>
        <ProformaEntryPage />
      </CustomCard>
    </div>
  )
}

export default ProformaMain