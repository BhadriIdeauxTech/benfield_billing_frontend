import React from 'react'
import ExpenseForm from './Partials/ExpenseForm'
import { TopTitle } from '../../Components/Form/TopTitle'
import { CustomCard } from '../../Components/CustomCard'
import { ToastContainer } from 'react-toastify'

const Expense = () => {
  return (
    <div>
      <TopTitle Heading={'Expense'} />

      <CustomCard width={'800px'}>
        <ExpenseForm />
      
      </CustomCard>
    </div>
  )
}

export default Expense