"use client";

import React, { useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, getExpenseItems, totalAmountFunc } from "../store/features/expenseSlice";

const ExpenseItems = () => {
  const { expense, filteredExpense, totalAmount, isLoading, active } = useSelector((state) => state.expense);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(totalAmountFunc())
  },[filteredExpense, expense])

  const trashHandler = (id) => {
    dispatch(deleteExpense(id)).then(() => {
      dispatch(getExpenseItems());
    });
  };

  useEffect(()=>{
    dispatch(getExpenseItems())
    console.log(filteredExpense)
  },[])



  if (isLoading === true) {
    return <p className="w-full text-center">Loading...</p>;
  }

  if (filteredExpense.length === 0) {
    return <p className="w-full text-center">No Expense Found</p>;
  }

  // if(expense.length === 0){
  //   return <p className="w-full text-center">No Expense Found</p>
  // }

  // if (active !== ''){
  //   return(
  //     <div className="flex flex-col w-full gap-4">
  //     {filteredExpense.map((item, index) => (
  //       <ExpenseItem key={index} item={...item} trash />
  //     ))}    
  //   </div>

  //   )
  // }

  return (
    <div className="flex flex-col w-full gap-4">
      
      {filteredExpense.length > 0 ?
        filteredExpense.map((item, index) => (
        <ExpenseItem key={index} item={...item} trashHandel={()=>trashHandler(item.id)} />
      ))
      : <p className="w-full text-center">No item Found</p>
    }

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
