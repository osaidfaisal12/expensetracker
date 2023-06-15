"use client";

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, getExpenseItems, monthlyBudgetFunc } from "../store/features/expenseSlice";

const Form = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [openBudget, setBudget] = React.useState(false);

  const title = useRef(null);
  const amount = useRef(null);
  const date = useRef(null);
  const tags = useRef(null);
  const budget = useRef(null);
  const [paymentmethod, setPaymentmethod] = React.useState('cash')

  const dispatch = useDispatch()
  const { userID } = useSelector((state) => state.expense);

  const openFormHandler = () => {
    setBudget(false)
    setOpenForm(!openForm);
  }

  const openBudgetHandler = () => {
    setOpenForm(false)
    setBudget(!openBudget);
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

  const submitHandler = (e) => {
    e.preventDefault()
    let newDate = new Date(date.current.value)
    const day =  newDate.getDate()
    const month = monthNames[newDate.getMonth()]
    const year = newDate.getFullYear()
    
    newDate = `${day}-${month}-${year}`

    console.log(title.current.value, amount.current.value, newDate, tags.current.value.split(','), paymentmethod)

    
    if (title.current.value === '' || amount.current.value === '' || newDate === '' || tags.current.value === '') return alert('Please fill all the fields')
    const newExpense = {
      title: title.current.value,
      amount: amount.current.value,
      date: newDate,
      tags: tags.current.value.split(','),
      paymentmethod: paymentmethod
    };
    
    dispatch(addExpense({newExpense, userID})).then(() => {
      dispatch(getExpenseItems(userID));
    });

    // title.current.value = ''
    // amount.current.value = ''
    // date.current.value = ''
    // tags.current.value = ''
    // setPaymentmethod('cash')
    // setOpenForm(false)
  }

  const submitBudgetHandler = (e) => {
    e.preventDefault()
    if (budget.current.value === '') return alert('Please enter monthly budget')
    if (budget.current.value < 0) return alert('Please enter a valid monthly budget')
    const monthlyBudget = budget.current.value
    dispatch(monthlyBudgetFunc({monthlyBudget, userID}))
    // budget.current.value = ''
    // setBudget(false)
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Expenses</h1>
        <div className="flex gap-4">
        
        <button onClick={openBudgetHandler} className="rounded-lg border-2 hover:border-white hover:duration-200 border-blue-600 p-2">
          Add Monthly Budget +{" "}
        </button>
        <button onClick={openFormHandler} className="rounded-lg border-2 hover:border-white hover:duration-200 border-blue-600 p-2">
          Add Expense +{" "}
        </button>
        
        </div>
      </div>
      {openForm ?
        <form id="form" onSubmit={submitHandler} className="flex flex-col border-[1px] border-white/10 p-8 gap-8 rounded-lg justify-between items-center w-full">
        <div className="flex w-full gap-4 justify-between">
          <div className="flex gap-2 items-center">
            <label className="text-white w-fit" htmlFor="expense">
              Expense
            </label>
            <input
              type="text"
              ref={title}
              className="bg-transparent rounded-md border-[1px] border-white text-white py-2 px-4 w-full"
              id="expense"
              placeholder="Add an expense"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-white w-fit" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              ref={amount}
              className="bg-transparent rounded-md border-[1px] border-white text-white py-2 px-4 w-full"
              id="amount"
              placeholder="Enter amount"
            />
          </div>
          
        </div>

        <div className="flex w-full gap-4 justify-between">
          <div className="flex gap-2 items-center">
            <label className="text-white w-fit" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              ref={date}
              className="bg-transparent rounded-md border-[1px] border-white text-white py-2 px-4 w-full"
              id="date"
              placeholder="Select date"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-white w-fit" htmlFor="Tags">
              Tags
            </label>
            <input
              type="text"
              ref={tags}
              className="bg-transparent rounded-md border-[1px] border-white text-white py-2 px-4 w-full"
              id="Tags"
              placeholder="Comma spearated tags"
            />
          </div>
          
        </div>
        
        <div className="w-full flex  items-center gap-8">
	      <label>Payment method:</label>
        <div className="gap-2 flex">
        <input type="radio" checked={paymentmethod == 'cash'} onChange={()=>{setPaymentmethod('cash')}} name="method"  id="cash" />
        <label htmlFor="cash">Cash</label>
        </div>
        <div className="gap-2 flex">
        <input type="radio" onChange={()=>{setPaymentmethod('card')}} name="method"  id="card" />
        <label htmlFor="card">Card</label>
        </div>
	    </div>

        <button id="form" className="rounded-lg hover:text-black font-semibold w-full hover:bg-white hover:duration-200 bg-blue-600 p-2">
          Add Expense
        </button>
      </form>
      : openBudget ?

      <form id="budget" onSubmit={submitBudgetHandler} className="flex flex-col border-[1px] border-white/10 p-8 gap-8 rounded-lg justify-between items-center w-full">
        <div className="flex w-full gap-4 justify-between">       
          <div className="flex gap-2 items-center w-[70%]">
            <label className="text-white w-fit" htmlFor="budget">
              Budget
            </label>
            <input
              type="number"
              ref={budget}
              className="bg-transparent rounded-md border-[1px] border-white text-white py-2 px-4 w-full"
              id="budget"
              placeholder="Enter budget"
            />
          </div>
          <button id="budget" className="rounded-lg hover:text-black w-[30%] font-semibold  hover:bg-white hover:duration-200 bg-blue-600 p-2">
          Add Budget
        </button>
        </div>
      
      </form>

      : null
      
      }
    </div>
  );
};

export default Form;
