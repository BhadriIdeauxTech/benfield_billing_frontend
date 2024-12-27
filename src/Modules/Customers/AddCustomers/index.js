import React from 'react'
// import AddingCustomers from './Partials/AddCustomers'
import AddingCustomers from './Partials/AddCustomers'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const AddCustomers = ({getCustomers}) => {

  return (
    <div>
      <TopTitle Heading={'Add Customer'} />

      <CustomCard width={'95%'}>
      <AddingCustomers getCustomers={getCustomers} />
      </CustomCard>
    </div>
  )
}

export default AddCustomers
