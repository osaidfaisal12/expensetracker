"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActive, filterByDate, getData } from "../store/features/expenseSlice";

const CategoryByMonths = () => {
//   const [active, setActive] = React.useState("");

  const { expense, active } = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const tagFilter = (tag) => {
    if (active === tag) {
        dispatch(filterActive(''))
    //   setActive("");
      dispatch(getData())
    } else {
        dispatch(filterActive(tag))
    //   setActive(tag);
      dispatch(filterByDate(tag))
    }
    console.log(active)
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-[100%] flex gap-4 items-center flex-wrap">
      {months.map((tag, index) => (
        <button
          onClick={() => tagFilter(index)}
          key={index}
          className={` flex active:bg-black rounded-xl p-2  text-sm ${
            active === index
              ? "bg-white text-black flex justify-center items-center font-semibold"
              : "text-white bg-slate-700"
          }`}
        >
          {tag}
          {active === index && (
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
