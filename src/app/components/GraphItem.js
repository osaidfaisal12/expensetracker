'use client'

import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const GraphItem = ({chartData}) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Bar data={chartData} />
    </div>
  )
}

export default GraphItem