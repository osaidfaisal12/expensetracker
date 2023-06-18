'use client'

import Image from 'next/image'
import React from 'react'

const Buttons = ({name, logo, clickEvent,disabled}) => {
  return (
    <button disabled={disabled ? true : false} onClick={clickEvent} 
      className={` shadow-md  border-black px-4 py-3 w-full flex justify-center items-center  hover:duration-300 ${disabled ? 'bg-gray-300 text-gray-700' : 'hover:bg-slate-700 text-black hover:text-white'}`}>
        <Image src={logo} width={25} height={25} alt={name} className='mr-auto' />
        <p className='font-semibold absolute'>{name}</p>
    </button>
  )
}

export default Buttons