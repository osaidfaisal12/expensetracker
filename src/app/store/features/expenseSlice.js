"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState = {
  expense: [],
  filteredExpense: [],
  active: "",
  totalAmount: 0,
  monthlyBudget: 0,
  isLoading: true,
};

const url =
  "https://expensetracker-8328f-default-rtdb.firebaseio.com/Expenses.json";

export const getExpenseItems = createAsyncThunk(
  "expense/getExpenseItems",
  async () => {
    return await fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
);

export const monthlyBudgetFunc = createAsyncThunk(
  "expense/MonthlyBudgetFun",
  async (budget) => {
    const res = await axios.put('https://expensetracker-8328f-default-rtdb.firebaseio.com/budget.json', budget);
    return res.data;
  }
);

export const getmonthlyBudgetFunc = createAsyncThunk(
  "expense/getMonthlyBudget",
  async () => {
    const res = await axios.get('https://expensetracker-8328f-default-rtdb.firebaseio.com/budget.json');
    console.log(res.data)
    return res.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id) => {
    const res = await axios
      .delete(
        `https://expensetracker-8328f-default-rtdb.firebaseio.com/Expenses/${id}.json`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return res.data;
  }
);

export const addExpense = createAsyncThunk('expense/addExpense', async (expense) => {
  const res = await axios.post('https://expensetracker-8328f-default-rtdb.firebaseio.com/Expenses.json', expense)
  return res.data
})

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // addExpense: (state, action) => {
    //   const { title, amount, date, tags, paymentmethod } = action.payload;
    //   const newExpense = {
    //     title,
    //     amount,
    //     date,
    //     tags,
    //     paymentmethod,
    //   };

    //    axios
    //     .post(
    //       "https://expensetracker-8328f-default-rtdb.firebaseio.com/Expenses.json",
    //       newExpense
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   state.filteredExpense = [...state.expense, newExpense];
    //   // console.log(state.expense)

    //   //   state.filteredExpense = [...state.expense]
    //   state.active = "";
    // },
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
        // console.log(state.active,tag)
        // let filteredExpense = state.expense.filter((item) => item.tags.includes(tag));
        let temp = state.expense.filter((item) => item.tags.includes(tag));
        // console.log(temp)
        state.filteredExpense = temp;
      }

      //   const filteredExpense = state.expense.filter((element) =>
      //     element.tags.includes(filterByTag)
      //   );

      //   console.log(filteredExpense)
      // //   state.expense = filteredExpense;

      //   state.filteredExpense = filteredExpense;
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
    

    // deleteExpense: (state, action) => {
    //   const expenseID = action.payload;

    //   state.expense = state.expense.filter((item) => item.id !== expenseID);
    //   state.filteredExpense = state.filteredExpense.filter((item) => item.id !== expenseID);
    // },
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
      // console.log(state.expense)
    },
    [getExpenseItems.rejected]: (state) => {
      state.isLoading = false;
    },

    [deleteExpense.fulfilled]: (state, action) => {
      const expenseID = action.payload;

      state.expense = state.expense.filter((item) => item.id !== expenseID);
      state.filteredExpense = state.filteredExpense.filter(
        (item) => item.id !== expenseID
      );
      console.log(state.filteredExpense);
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
    }
  },
});

export const {
  filterByTag,
  filterByDate,
  filterByPaymentMethod,
  totalAmountFunc,
  filterActive,
} = expenseSlice.actions;

export default expenseSlice.reducer;
