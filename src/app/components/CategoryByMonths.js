"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDate } from "../store/features/expenseSlice";

const CategoryByMonths = () => {
  const { active } = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const tagFilter = (tag) => {
    dispatch(filterByDate(tag));
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="w-[100%] flex gap-2 items-center flex-wrap">
      {months.map((tag, index) => (
        <button
          onClick={() => tagFilter(months[index])}
          key={index}
          className={` flex active:bg-black rounded-xl p-2  text-sm ${
            active === months[index]
              ? "bg-white text-black flex justify-center items-center font-semibold"
              : "text-white bg-slate-700"
          }`}
        >
          {tag}
          {active === months[index] && (
            <p className="ml-2 flex items-center justify-center rounded-full bg-black font-semibold text-white w-[20px] h-[20px] pb-1">
              x
            </p>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryByMonths;
