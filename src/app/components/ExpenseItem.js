'use client'

import React from 'react'

const ExpenseItem = ({title, amount}) => {

  function getCurrentDate(){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}-${month<10?`0${month}`:`${month}`}-${year}`
  }

  return (
    <div className='w-full p-4 rounded-lg bg-slate-900 flex justify-between items-center'>
        <div className='flex justify-center items-center gap-4'>
            <div className='bg-white p-2 rounded-md text-black font-semibold text-[0.875rem]'>{getCurrentDate()}</div>
            <p>{title}</p>
        </div>
        <div className='bg-white p-2 rounded-md text-black font-semibold text-[0.875rem]'>Rs. {amount}</div>
    </div>
  )
}

export default ExpenseItem