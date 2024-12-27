import React from 'react'
import ViewSite from './Partials/ViewSite'
import { TopTitle } from '../../Components/Form/TopTitle'

export const SiteStatus = () => {
  return (
    <div>
      <TopTitle Heading={'View Site Status'} />
      <ViewSite />
    </div>
  )
}
