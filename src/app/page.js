import Image from 'next/image'
import ExpenseGraph from './components/ExpenseGraph'
import ExpenseItems from './components/ExpenseItems'
import Form from './components/Form'

export default function Home() {
  return (
    <div className='w-[700px] rounded-xl flex flex-col p-4 gap-4 min-h-screen bg-slate-800'>
      <ExpenseGraph />
      <Form />
      <ExpenseItems />
    </div>
  )
}
