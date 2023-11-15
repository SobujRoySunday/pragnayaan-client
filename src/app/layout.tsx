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
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
      <script src={`https://apis.mappls.com/advancedmaps/api/${process.env.MAP_API_KEY}/map_sdk?v=3.0&layer=vector`} async />
    </html>
  )
}
