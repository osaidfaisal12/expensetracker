'use client'

import React, { use, useEffect, useState } from 'react'
import GraphItem from './GraphItem'
import { useDispatch, useSelector } from 'react-redux'
import { getExpenseItems } from '../store/features/expenseSlice'


const ExpenseGraph = () => {  
  const { expense, userID } = useSelector((state) => state.expense);
  const [graph, setGraph] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExpenseItems());
  }, []);

  useEffect(() => {
    const updatedGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    expense.forEach((expense) => {
      const date = new Date(expense.date);
      const month = date.getMonth();
      updatedGraph[month] += parseInt(expense.amount);
    });

    setGraph(updatedGraph);
  }, [expense]);

  const [userData, setUserData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Expense',
        data: graph,
        backgroundColor: '#00B4E8',
      },
    ],
  });

  // sky blue: #00B4D8

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      datasets: [
        {
          ...prevUserData.datasets[0],
          data: graph,
        },
      ],
    }));
  }, [graph]);


  return (
    <div className='bg-slate-950 w-full flex justify-center items-center h-[250px] rounded-xl'>
        { userID ?
          <GraphItem chartData={userData} />
          :
          <div className='text-white text-2xl'>login to view graph</div>
        }
    </div>
  )
}

export default ExpenseGraph