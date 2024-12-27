import React from 'react'
import { CustomCard } from '../../../Components/CustomCard'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { AddItems } from './Partials/AddItems'

export const AddProduct = ({ seProduct }) => {
  return (
    <div>
      <TopTitle Heading={'Add Items'} />

      <CustomCard width={'95%'}>
        <AddItems seProduct={seProduct} />
      </CustomCard>
    </div>
  )
}
