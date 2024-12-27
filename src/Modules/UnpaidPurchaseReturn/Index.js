import React from 'react'
import UnpaidBills from './Partials/UnpaidBills'
import { TopTitle } from '../../Components/Form/TopTitle'

const UnpaidPurchaseReturn = () => {
  return (
    <div>
        <TopTitle Heading={'Unpaid Purchase Return Bill'} />
        <UnpaidBills />
    </div>
  )
}

export default UnpaidPurchaseReturn