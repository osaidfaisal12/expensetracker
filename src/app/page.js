import Image from 'next/image'
import ExpenseGraph from './components/ExpenseGraph'
import ExpenseItems from './components/ExpenseItems'
import Form from './components/Form'
import Categories from './components/Categories'
import CategoryByMonths from './components/CategoryByMonths'
import { Toaster } from 'react-hot-toast'
import LoginModal from './components/LoginModal'

export default async function Home() {

  return (
    <div className='md:w-[700px] w-[380px] rounded-xl flex flex-col p-4 md:gap-4 gap-8 min-h-screen md:bg-slate-800'>
      <LoginModal/>
      <ExpenseGraph />
      <Form />
      <Categories />
      <hr />
      <CategoryByMonths />
      <ExpenseItems />
    </div>
  )
}
