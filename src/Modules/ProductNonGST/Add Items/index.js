import React from 'react'
import { AddItems } from './Partials/AddItems'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

export const AddProductNonGST = ({ seProduct }) => {
  return (
    <div>
      <TopTitle Heading={'Add Items'} />
      <CustomCard width={'95%'}>
        <AddItems seProduct={seProduct} />
      </CustomCard>
    </div>
  )
}
