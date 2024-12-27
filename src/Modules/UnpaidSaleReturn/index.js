import React from 'react'
import UnpaidBills from './Partials/UnpaidBills'
import { TopTitle } from '../../Components/Form/TopTitle'

const UnPaidBillRetun = () => {
  return (
    <div>
        <TopTitle Heading={'Unpaid Sales Return Bill'} />
        <UnpaidBills />
    </div>
  )
}

export default UnPaidBillRetun