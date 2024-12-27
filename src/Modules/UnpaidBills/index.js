import React from 'react'
import UnpaidBills from './Partials/UnpaidBills'
import { TopTitle } from '../../Components/Form/TopTitle'

const UnPaidBill = () => {
  return (
    <div>
        <TopTitle Heading={'Unpaid Sales Bill'} />
        <UnpaidBills />
    </div>
  )
}

export default UnPaidBill