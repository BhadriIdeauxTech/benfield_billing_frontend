import React, { Fragment } from 'react'
import { Site } from './Partials/Site'
import { TopTitle } from '../../../Components/Form/TopTitle'

export const SiteSiteSection = () => {
    return (
        <Fragment>
            <TopTitle Heading={'Site Status'} />
            <Site />
        </Fragment>
    )
}
