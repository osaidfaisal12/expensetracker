'use client'

import React from 'react'
import GraphItem from './GraphItem'

const ExpenseGraph = () => {
  return (
    <div className='bg-slate-950 w-full flex gap-4 justify-center items-center h-[250px] rounded-xl p-4'>
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
        <GraphItem />
    </div>
  )
}

export default ExpenseGraph