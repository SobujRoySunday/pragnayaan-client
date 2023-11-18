import type { Metadata } from 'next'
import './globals.css'
import ToastProvider from '@/providers/ToastProvider'

export const metadata: Metadata = {
  title: 'Pragnayaan',
  description: 'An easy to use app to experience smart travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
