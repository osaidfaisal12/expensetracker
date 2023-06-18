'use client'

import React, { use } from 'react'
import Buttons from './Buttons'
import { logout, signInWithGithub, signInWithGoogle, testFunc } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getExpenseItems, getmonthlyBudgetFunc, logOutFunc, userIDFunc } from '../store/features/expenseSlice'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const [open, setOpen] = React.useState(false)

    const dispatch = useDispatch()
    const { userID } = useSelector((state) => state.expense)

    const modelHandle = () => {
        setOpen(!open)
    }

    const router = useRouter()

    const signInWithGoogleHandler = () => {
        signInWithGoogle().then((result) => {
            dispatch(userIDFunc(result.user.uid))
            setOpen(false)
            dispatch(getExpenseItems(result.user.uid))
            dispatch(getmonthlyBudgetFunc(result.user.uid))
            router.refresh()
        }).catch((error) => {
            alert(error.message);
        });
    }

    const logOutHandler = () => {
        logout().then(() => {
            alert('Logged Out')
            dispatch(logOutFunc())
            router.reload()
        }).catch((error) => {
            alert(error.message);
        });
    }

  return (
    <div className='w-full flex justify-end items-center'>
        {
            !userID ? 
            <button onClick={modelHandle} className='bg-slate-700 text-white rounded-md px-4 py-2'>LogIn</button>
            :
            <button onClick={logOutHandler} className='bg-slate-700 text-white rounded-md px-4 py-2'>LogOut</button>
        }

        {open &&
            <div className='w-screen flex justify-center items-center h-[100vh] fixed inset-0 bg-black/70'>
            <div className='w-[400px] bg-white rounded-xl flex flex-col justify-between p-8'>
                <div className='text-black font-semibold text-[1.25rem] flex justify-between items-center'>
                    <p>Sign In</p>
                    <button onClick={modelHandle} className='rounded-full bg-black p-1 flex justify-center items-center pb-2 w-[30px] h-[30px] text-white'>x</button>
                </div>
                <div className='w-full mb-8 mt-16 gap-3 flex flex-col items-center'>
                    <Buttons clickEvent={signInWithGoogleHandler} name='Sign In with Google' logo='/google.png' />
                    <Buttons disabled clickEvent={signInWithGithub} name='Sign In with Github' logo='/github.png' />
                    <Buttons disabled clickEvent={()=>{alert("use other aut methods")}} name='Sign In with Facebook' logo='/facebook.png' />

                </div>
            </div>
        </div>}
    
    </div>
  )
}

export default LoginModal