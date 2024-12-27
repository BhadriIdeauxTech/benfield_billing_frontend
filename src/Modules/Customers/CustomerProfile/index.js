import React from 'react'
import CustomerProfilesDetails from './Partials/CustomerProfiles'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const CustomerProfiles = ({ setCutomer, getCustomer }) => {
  return (
    <div>
      <TopTitle Heading={'Customer Profile'} />
      <CustomCard width={'95%'}>
        <CustomerProfilesDetails setCutomer={setCutomer} getCustomer={getCustomer} />
      </CustomCard>
    </div>
  )
}

export default CustomerProfiles