import React from 'react'
import TableEdit from './Partials/TableEdit'
import { TopTitle } from '../../../Components/Form/TopTitle'

const CustomerEdit = ({ setCustomer, getCustomer }) => {
  return (
    <div>
      <TopTitle Heading={'View Customers List'} />
      <TableEdit setCustomer={setCustomer} getCustomer={getCustomer} />
    </div>
  )
}

export default CustomerEdit