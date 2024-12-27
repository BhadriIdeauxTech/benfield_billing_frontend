import React from 'react'
import ViewMemberList from './Partials/MemberList'
import { TopTitle } from '../../../Components/Form/TopTitle'

const MemberList = ({ getMembers }) => {
  return (
    <div>
      <TopTitle Heading={'User List'} />
      <ViewMemberList getMembers={getMembers} />
    </div>
  )
}

export default MemberList
