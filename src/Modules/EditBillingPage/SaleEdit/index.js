import React from 'react'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { InvoiceTable } from '../../ViewSaleBills/Partials/InvoiceTable'
import SaleEditTableDetails from './Partials/SaleEditTable'

const SaleEditTable = ({ getInvoice, setInvoice }) => {
    return (
        <div>
            <TopTitle Heading={'Sales List'} />
            <SaleEditTableDetails getInvoice={getInvoice} setInvoice={setInvoice} />
        </div>
    )
}

export default SaleEditTable