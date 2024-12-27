import React from 'react'
import { TopTitle } from '../../Components/Form/TopTitle'
import { InvoiceTable } from './Partials/InvoiceTable'

const QuatationBill = ({getInvoice,setInvoice}) => {
  return (

    <div>
        <TopTitle Heading={'Quotation List'} />
        <InvoiceTable getInvoice={getInvoice} setInvoice={setInvoice} />
    </div>
  )
}

export default QuatationBill