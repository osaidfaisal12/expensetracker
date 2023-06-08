'use client'

import React from 'react'
import ExpenseItem from './ExpenseItem'
import { useSelector } from 'react-redux'

const ExpenseItems = () => {

  const {expense} = useSelector(state => state.expense)

  return (
    <div className='flex flex-col w-full gap-4'>
        {expense.map((item, index) => (
          <ExpenseItem  title={item.title} amount={item.amount}/>
        ))}
    </div>
  )
}

export default ExpenseItems