'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expense: []
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const expenseTitle = action.payload.title 
            const expenseAmount = action.payload.amount 
            state.expense.push({title: expenseTitle, amount: expenseAmount})
            console.log(state.expense)
        },
        
    }
})

export const {addExpense} = expenseSlice.actions

export default expenseSlice.reducer