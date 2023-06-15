"use client";

import React, { useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, getExpenseItems, getmonthlyBudgetFunc, totalAmountFunc } from "../store/features/expenseSlice";
import { Toaster, toast } from "react-hot-toast";
import { writeUserData } from "@/app/firebase";

const ExpenseItems = () => {
  const { userID, expense, filteredExpense, totalAmount, isLoading, active, monthlyBudget } = useSelector((state) => state.expense);
  const dispatch = useDispatch()

  useEffect(()=>{
    if(userID){
      dispatch(totalAmountFunc())
    }
  },[filteredExpense, expense])

  const trashHandler = (id) => {
    dispatch(deleteExpense(id)).then(() => {
      dispatch(getExpenseItems());
    });
    toast.success("Expense Deleted Successfully");
  };

  useEffect(()=>{
    if(userID){
      dispatch(getExpenseItems(userID))
      dispatch(getmonthlyBudgetFunc(userID))
    }

  },[])


  if (isLoading === true && userID) {
    return <p className="w-full text-center">Loading...</p>;
  }

  if (filteredExpense.length === 0  && userID) {
    return <p className="w-full text-center">No Expense Found</p>;
  }

  if (!userID) {
    return <p className="w-full text-center">Please Login to see your Expenses</p>;
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
      {filteredExpense.length > 0 ?
        filteredExpense.map((item, index) => (
        <ExpenseItem key={index} item={...item} trashHandel={()=>trashHandler(item.id)} />
      ))
      : <p className="w-full text-center">No item Found</p>
    }

    <div className="flex flex-col justify-center items-center">
    {
      monthlyBudget < totalAmount ? 
      <div className="w-full p-2 mt-8 rounded-lg bg-red-500 justify-center flex font-semibold items-center">Your budget is { monthlyBudget }. YOU EXCEED Rs. { totalAmount - monthlyBudget}</div>
      :  <div className="w-full p-2 mt-8 rounded-lg bg-slate-900 justify-center flex font-semibold items-center">Your this month budget is { monthlyBudget }</div>

    }


      <div className="w-full p-4 mt-4 rounded-lg bg-slate-900 items-center">
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

    </div>
  );
};

export default ExpenseItems;
