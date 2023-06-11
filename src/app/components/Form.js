"use client";

import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addExpense, getExpenseItems } from "../store/features/expenseSlice";

const Form = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const title = useRef(null);
  const amount = useRef(null);
  const date = useRef(null);
  const tags = useRef(null);
  const [paymentmethod, setPaymentmethod] = React.useState('cash')

  const dispatch = useDispatch()

  const openFormHandler = () => {
    setOpenForm(!openForm);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(title.current.value, amount.current.value, date.current.value, tags.current.value.split(','), paymentmethod)

    if (title.current.value === '' || amount.current.value === '' || date.current.value === '' || tags.current.value === '') return alert('Please fill all the fields')
    
    dispatch(addExpense({title:title.current.value, amount:amount.current.value, date:date.current.value, tags:tags.current.value.split(','), paymentmethod:paymentmethod}))

  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Expenses</h1>
        <div className="flex gap-4">
        
        <button onClick={openFormHandler} className="rounded-lg border-2 hover:border-white hover:duration-200 border-blue-600 p-2">
          Add Monthly Budget +{" "}
        </button>
        <button onClick={openFormHandler} className="rounded-lg border-2 hover:border-white hover:duration-200 border-blue-600 p-2">
          Add Expense +{" "}
        </button>
        
        </div>
      </div>
      {openForm &&
        <form onSubmit={submitHandler} className="flex flex-col border-[1px] border-white/10 p-8 gap-8 rounded-lg justify-between items-center w-full">
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

        <button className="rounded-lg hover:text-black font-semibold w-full hover:bg-white hover:duration-200 bg-blue-600 p-2">
          Add Expense
        </button>
      </form>
      }
    </div>
  );
};

export default Form;
