'use client'

import Image from 'next/image'
import React from 'react'

const Buttons = ({name, logo, clickEvent}) => {
  return (
    <button onClick={clickEvent} className='text-black hover:text-white shadow-md  border-black px-4 py-3 w-full flex justify-center items-center hover:bg-slate-700 hover:duration-300'>
        <Image src={logo} width={25} height={25} alt={name} className='mr-auto' />
        <p className='font-semibold absolute'>{name}</p>
    </button>
  )
}

export default Buttons