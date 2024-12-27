import React from 'react'
import BusinessProfile from './Partials/BusinessProfile'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { CustomCard } from '../../../Components/CustomCard'

const BusinessProfiles = ({setCompanyProfile}) => {


  return (
    <div>
      <TopTitle Heading={' Add Business Profile'} />

      <CustomCard width={'95%'}>
        <BusinessProfile setCompanyProfile={setCompanyProfile} />
      </CustomCard>
    </div>
  )
}

export default BusinessProfiles