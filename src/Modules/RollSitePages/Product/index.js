import React from 'react'
import ProductTable from './Partials/ProductTable'
import { TopTitle } from '../../../Components/Form/TopTitle'

const SiteProduct = () => {
    return (
        <div>
            <TopTitle Heading={'Product'} />
            <ProductTable />
        </div>
    )
}

export default SiteProduct