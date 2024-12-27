import React from 'react'
import { TopTitle } from '../../../Components/Form/TopTitle'
import QuotationTableView from './Partial/QuotationTableView'

const QuotationEditTable = () => {
    return (
        <div>
            <TopTitle Heading={'Quotation List'} />
            <QuotationTableView />
        </div>
    )
}

export default QuotationEditTable