import React from 'react'
import TableEdit from './Partials/TableEdit'
import { TopTitle } from '../../../Components/Form/TopTitle'

const EditSupplierPayment = ({getSupplier,setSupplier}) => {
  return (
    <div>
       <TopTitle Heading={'View Supplier payment'} />
        <TableEdit setSupplier={setSupplier} getSupplier={getSupplier}/>
    </div>
  )
}

export default EditSupplierPayment