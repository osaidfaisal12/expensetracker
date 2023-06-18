import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './store/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expense Tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white flex justify-center py-6 md:py-20 items-center`}>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  )
}
