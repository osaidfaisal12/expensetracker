"use client";

import { createSlice } from "@reduxjs/toolkit";
import { expenselist } from "../../../../data";
import crypto from 'crypto';
import axios from "axios";

const initialState = {
  expense: [],
  filteredExpense: [],
  active: "",
  totalAmount: 0,
  monthlyBudget: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.filteredExpense = state.expense;
    },
    addExpense: (state, action) => {
      const {title, amount, date, tags, paymentmethod} = action.payload
      const newExpense = {  
        title,
        amount,
        date,
        tags,
        paymentmethod,
      }

      axios.post('https://expensetracker-8328f-default-rtdb.firebaseio.com/Expenses.json', newExpense).then((res)=>{
        console.log(res.data)
      }).catch((err)=>{console.log(err)})

      state.expense = [...state.expense, newExpense]
      console.log(state.expense)
      state.filteredExpense = [...state.expense]
      state.active = ''
    },
    filterActive: (state, action) => {
      state.active = action.payload;
    },
    filterByTag: (state, action) => {
      const filterByTag = action.payload;

      if (filterByTag === "") return (state.filteredExpense = state.expense);

      const filteredExpense = state.expense.filter((element) =>
        element.tags.includes(filterByTag)
      );
      state.filteredExpense = filteredExpense;
    },
    filterByDate: (state, action) => {
      let filterByDate = (action.payload + 1).toString();

      if (filterByDate.length < 2) {
        filterByDate = "0" + filterByDate;
      }

      const filteredExpense = state.expense.filter(
        (item) => item.date.split("-")[1] === filterByDate
      );

      state.filteredExpense = filteredExpense;
    },
    totalAmountFunc: (state, action) => {
      let total = 0;
      const totalAmount = state.filteredExpense.forEach(
        (expense) => (total += expense.amount)
      );

      state.totalAmount = total;
    },
    deleteExpense: (state, action) => {
      const expenseID = action.payload;

      state.expense = state.expense.filter((item) => item.id !== expenseID);
      state.filteredExpense = state.filteredExpense.filter((item) => item.id !== expenseID);
    },
  },
});

export const {
  deleteExpense,
  addExpense,
  filterByTag,
  getData,
  filterByDate,
  totalAmountFunc,
  filterActive,
} = expenseSlice.actions;

export default expenseSlice.reducer;
