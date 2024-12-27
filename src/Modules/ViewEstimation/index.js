import React from 'react'
import { TopTitle } from '../../Components/Form/TopTitle'
import { InvoiceTable } from './Partials/InvoiceTable'

export const ViewEstimationPrint = () => {
  return (
    <div>
      <TopTitle Heading={'Estimation List'} />
      
      <InvoiceTable />
    </div>
  )
}
