import React from 'react'
import AddingMembers from './Partials/AddMembers'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const AddMembers = ({ setMembers }) => {
  return (
    <div>
      <TopTitle Heading={'Add User'} />
      <CustomCard width={'800px'}>
        <AddingMembers setMembers={setMembers} />
      </CustomCard>
    </div>
  )
}

export default AddMembers

