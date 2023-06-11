"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActive, filterByPaymentMethod, filterByTag, getData, getExpenseItems } from "../store/features/expenseSlice";

const Categories = () => {
  // const [active, setActive] = React.useState("");

  const { expense, active } = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const uniqueTags = [...new Set(expense.flatMap((element) => element.tags))];


  const tagFilter = (tag) => {
    dispatch(filterByTag(tag))
  };

  const paymentfilter = (payment) => {
    dispatch(filterByPaymentMethod(payment))
  }

  // useEffect(() => {
  //   console.log(active)
  // }, [active]);

  return (
    <div className="w-[100%] flex gap-4 items-center flex-wrap">
              
      {uniqueTags.map((element, index) =>
        
          <button
            onClick={() => tagFilter(element)}
            key={index}
            className={` flex  rounded-xl p-2  text-sm ${
              active === element
                ? "bg-white text-black flex justify-center items-center font-semibold"
                : "text-white bg-slate-700"
            }`}
          >
            {element}
            {active === element && (
              <p className="ml-2 flex items-center justify-center rounded-full bg-black font-semibold text-white w-[20px] h-[20px] pb-1">
                x
              </p>
            )}
          </button>
      )}


        <button
            onClick={() => paymentfilter('cash')}
            className={` flex  rounded-xl p-2  text-sm ${
              active === 'cash'
                ? "bg-white text-black flex justify-center items-center font-semibold"
                : "text-white bg-green-500"
            }`}
          >
            Cash
            {active === 'cash' && (
              <p className="ml-2 flex items-center justify-center rounded-full bg-black font-semibold text-white w-[20px] h-[20px] pb-1">
                x
              </p>
            )}
          </button>
          <button
            onClick={() => paymentfilter('card')}
            className={` flex  rounded-xl p-2  text-sm ${
              active === 'card'
                ? "bg-white text-black flex justify-center items-center font-semibold"
                : "text-white bg-green-500"
            }`}
          >
            Card
            {active === 'card' && (
              <p className="ml-2 flex items-center justify-center rounded-full bg-black font-semibold text-white w-[20px] h-[20px] pb-1">
                x
              </p>
            )}
          </button>
    </div>
  );
};

export default Categories;
