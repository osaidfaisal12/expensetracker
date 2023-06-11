'use client'

import Image from 'next/image';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../store/features/expenseSlice';

const ExpenseItem = ({item, trashHandel, trash}) => {

  function getCurrentDate(){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}-${month<10?`0${month}`:`${month}`}-${year}`
  }


  return (
    <div className='w-full p-4 rounded-lg bg-slate-900 items-center'>
        <div className='w-full flex justify-between items-center'>
        <div className='flex justify-center items-center gap-4'>
            <div className='bg-white p-2 rounded-md text-black font-semibold text-[0.875rem]'>{getCurrentDate()}</div>
            <p>{item.title}</p>
        </div>
        <div className='bg-white p-2 rounded-md text-black font-semibold text-[0.875rem]'>Rs. {item.amount}</div>
        </div>
        
          <div className='flex justify-between mt-4 items-center'>
            <div className='flex justify-start items-center gap-2'>
            {
              item.tags.length > 0 ?
              <p className='text-[0.75rem]  flex gap-2'>
              {
                item.tags.map((tag, index) => (
                  <span className='bg-slate-700 text-slate-200 rounded-md p-1' key={index}>{tag}</span>
                ))
              }  
            </p>
            : <p className='bg-slate-700 text-[0.75rem]  flex text-slate-200 rounded-md p-1'>No Tags Found</p>
  
          }
            <p>
              <span className='bg-green-500 text-[0.75rem]  flex font-bold text-slate-200 rounded-md p-1'>{item.paymentmethod.toUpperCase()}</span>
            </p>
            </div>

            {
              trash ? null : <div className='flex justify-center items-center gap-2'>
              <Image src='/trash-bin.png' width={27} height={27} alt='bin' className='cursor-pointer' onClick={trashHandel} />
              </div>
            }
            
        </div>
    </div>
  )
}

export default ExpenseItem