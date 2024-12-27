import React from 'react'
import TableEditBusiness from './Partials/TableEditBusiness'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const EditBusinessProfiles = () => {
  return (
    <div>
      <TopTitle Heading={'View Business Profiles'} />

      <CustomCard width={'95%'}>
        <TableEditBusiness />
      </CustomCard>
    </div>
  )
}

export default EditBusinessProfiles