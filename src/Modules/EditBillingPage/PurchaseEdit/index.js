import React from 'react'
import { TopTitle } from '../../../Components/Form/TopTitle'
import PurchaseViewTables from './Partials/PurchaseViewTables'

const PurchaseViewTable = () => {
    return (
        <div>
            <TopTitle Heading={'Purchase List'} />
            <PurchaseViewTables />
        </div>
    )
}

export default PurchaseViewTable