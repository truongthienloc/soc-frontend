import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ToastContainer } from 'react-toastify'

import '~/styles/global.scss'
import '~/styles/codeEditor.scss'
import 'codemirror/lib/codemirror.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'System On Chip',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
