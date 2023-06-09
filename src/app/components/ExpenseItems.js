"use client";

import React, { useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, totalAmountFunc } from "../store/features/expenseSlice";

const ExpenseItems = () => {
  const { expense, filteredExpense, totalAmount } = useSelector((state) => state.expense);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(totalAmountFunc())
  },[filteredExpense, expense])

  useEffect(()=>{
    filteredExpense
  },[filteredExpense, expense])

  const trashHandler = (id) => {
    dispatch(deleteExpense(id))
  }


  if (filteredExpense.length < 1) {
    return <p className="w-full text-center">No Expenses Found.</p>;
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {filteredExpense.map((item, index) => (
        <ExpenseItem key={index} item={...item} trashHandel={()=>trashHandler(item.id)} />
      ))}

      <div className="w-full p-4 mt-8 rounded-lg bg-slate-900 items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-center gap-4">
            <p>Total: </p>
          </div>
          <div className="bg-white p-2 rounded-md text-black font-semibold text-[0.875rem]">
            Rs. {totalAmount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItems;
