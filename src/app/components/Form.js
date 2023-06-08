"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/features/expenseSlice";

const Form = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const dispatch = useDispatch()

  const openFormHandler = () => {
    setOpenForm(!openForm);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addExpense({title:title, amount:amount}))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Expenses</h1>
        <button onClick={openFormHandler} className="rounded-lg border-2 hover:border-white hover:duration-200 border-blue-600 p-2">
          Add Expense +{" "}
        </button>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent rounded-md border-[1px] border-white text-white py-2 px-4 w-full"
              id="amount"
              placeholder="Enter amount"
            />
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
