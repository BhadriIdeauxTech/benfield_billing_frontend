import React from 'react'
import { TopTitle } from '../../Components/Form/TopTitle'
import { InvoiceTable } from './Partials/InvoiceTable'

export const ViewQuotationNonGSTPrint = () => {
  return (
    <div>
      <TopTitle Heading={'Quotation Estimate List'} />
      
      <InvoiceTable />
    </div>
  )
}
