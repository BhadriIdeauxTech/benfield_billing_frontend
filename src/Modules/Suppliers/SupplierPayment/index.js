import React from 'react'
import SupplierPayementDetails from './Partials/SupplierPayementDetails'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const SupplierPayment = ({setSupplier,getSupplier}) => {
  return (
    <div>
      <TopTitle Heading={'Supplier Payments'} />

      <CustomCard width={'95%'}>
        <SupplierPayementDetails setSupplier={setSupplier} getSupplier={getSupplier} />
      </CustomCard>
    </div>
  )
}

export default SupplierPayment