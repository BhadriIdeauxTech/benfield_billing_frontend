import React from 'react'
import SupplierProfile from './Partials/SupplierProfile'
import TabDetails from './Partials/TabDetails'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const SupplierProfiles = ({ setSupplier, getSupplier }) => {
  return (
    <div>
      <TopTitle Heading={'Suppliers Profile'} />

      <CustomCard width={'95%'}>
        <SupplierProfile setSupplier={setSupplier} getSupplier={getSupplier} />
      </CustomCard>
    </div>
  )
}

export default SupplierProfiles