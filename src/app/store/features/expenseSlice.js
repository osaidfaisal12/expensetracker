"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expense: [],
  filteredExpense: [],
  active: "",
  totalAmount: 0,
  monthlyBudget: 0,
  isLoading: true,
  userID: false,
};

const url =
  "https://expensetracker-8328f-default-rtdb.firebaseio.com/Expenses.json";

export const getExpenseItems = createAsyncThunk(
  "expense/getExpenseItems",
  async (userID) => {

    const res = await axios.get(`https://expensetracker-8328f-default-rtdb.firebaseio.com/${userID}/Expenses.json`);
      return res.data;
  }
);

export const monthlyBudgetFunc = createAsyncThunk(
  "expense/MonthlyBudgetFun",
  async (state) => {

    const { monthlyBudget, userID } = state;
    const res = await axios.put(`https://expensetracker-8328f-default-rtdb.firebaseio.com/${userID}/budget.json`, monthlyBudget);
    return res.data;
 
  }
);

export const getmonthlyBudgetFunc = createAsyncThunk(
  "expense/getMonthlyBudget",
  async (userID) => {
    const res = await axios.get(`https://expensetracker-8328f-default-rtdb.firebaseio.com/${userID}/budget.json`);
    return res.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (state, API) => {

    const { id, userID } = state;
    const res = await axios
      .delete(
        `https://expensetracker-8328f-default-rtdb.firebaseio.com/${userID}/Expenses/${id}.json`
      )
    return id;
  }
);

export const addExpense = createAsyncThunk('expense/addExpense', async (state, api) => {

  const { newExpense, userID } = state
  const res = await axios.post(`https://expensetracker-8328f-default-rtdb.firebaseio.com/${userID}/Expenses.json`, newExpense)
  return res.data
 
})


const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    filterActive: (state, action) => {
      state.active = action.payload;
    },
    filterByTag: (state, action) => {
      const tag = action.payload;
      if (state.active === tag) {
        state.active = "";
        state.filteredExpense = state.expense;
      } else {
        state.active = tag;
       
        let temp = state.expense.filter((item) => item.tags.includes(tag));
        state.filteredExpense = temp;
      }

    },
    filterByDate: (state, action) => {
      let tag = action.payload;
      if (state.active === tag) {
        state.active = "";
        state.filteredExpense = state.expense;
      } else {
        state.active = tag;
        let temp = state.expense.filter(
          (item) => item.date.split("-")[1] === tag
        );
        state.filteredExpense = temp;
      }
    },
    filterByPaymentMethod: (state, action) => {
      const tag = action.payload;
      if (state.active === tag) {
        state.active = "";
        state.filteredExpense = state.expense;
      } else {
        state.active = tag;
        let temp = state.expense.filter((item) => item.paymentmethod === tag);
        state.filteredExpense = temp;
      }
    },
    totalAmountFunc: (state, action) => {
      let total = 0;
      const totalAmount = state.filteredExpense.forEach((expense) => {
        return (total += parseInt(expense.amount));
      });
      state.totalAmount = total;
    },
    userIDFunc: (state, action) => {
      const id = action.payload
      state.userID = id
    },
    logOutFunc: (state, action) => {
      state.userID = false
    }

  },
 
  extraReducers: {
    [getExpenseItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getExpenseItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      const expense = [];

      for (const key in action.payload) {
        expense.push({
          id: key,
          title: action.payload[key].title,
          amount: action.payload[key].amount,
          date: action.payload[key].date,
          tags: action.payload[key].tags,
          paymentmethod: action.payload[key].paymentmethod,
        });
      }

      state.expense = expense;
      state.filteredExpense = state.expense;
    },
    [getExpenseItems.rejected]: (state) => {
      state.isLoading = false;
    },


    [deleteExpense.fulfilled]: (state, action) => {
      const id = action.payload;
      state.expense = state.expense.filter((item) => item.id !== id);
      state.filteredExpense = state.filteredExpense.filter((item) => item.id !== id);
    },

    [monthlyBudgetFunc.fulfilled]: (state, action) => {
      const budget = action.payload;
      state.monthlyBudget = budget;
    },
    [getmonthlyBudgetFunc.fulfilled]: (state, action) => {
      const budget = action.payload;
      state.monthlyBudget = budget;
    },
    [addExpense.fulfilled]: (state, action) => {
      state.active = "";
    },
    
  },
});

export const {
  filterByTag,
  filterByDate,
  filterByPaymentMethod,
  totalAmountFunc,
  filterActive,
  userIDFunc,
  logOutFunc
} = expenseSlice.actions;

export default expenseSlice.reducer;
