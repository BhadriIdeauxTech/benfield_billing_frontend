import React from 'react'
import { TopTitle } from '../../Components/Form/TopTitle'
import { InvoiceTable } from './Partials/InvoiceTable'

export const ViewBillsPrint = ({ getInvoice, setInvoice }) => {
  return (
    <div>
      <TopTitle Heading={'Sales List'} />
      <InvoiceTable getInvoice={getInvoice} setInvoice={setInvoice} />
    </div>
  )
}
