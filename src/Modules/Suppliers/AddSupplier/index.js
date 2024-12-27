import React from 'react'
import Addsppliers from './Partials/Addsppliers'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const AddSpplier = ({getSupplier}) => {
  return (
    <div>
      <TopTitle Heading={'Add Suppliers'} />

      <CustomCard width={'95%'}>
        <Addsppliers getSupplier={getSupplier}/>
      </CustomCard>
    </div>
  )
}

export default AddSpplier