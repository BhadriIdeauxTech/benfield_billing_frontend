import React from 'react'
import UnpaidBills from './Partials/UnpaidBills'
import { TopTitle } from '../../Components/Form/TopTitle'

const UnpaidPurchaseBill = () => {
  return (
    <div>
        <TopTitle Heading={'Unpaid Purchase Bill'} />
        <UnpaidBills />
    </div>
  )
}

export default UnpaidPurchaseBill