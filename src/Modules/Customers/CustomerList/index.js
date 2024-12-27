import React from 'react'
import ViewCustomerList from './Partials/CustomerList'

const CustomerList = ({getCustomers}) => {
  return (
    <div>
      <ViewCustomerList getCustomers={getCustomers}/>
    </div>
  )
}

export default CustomerList
