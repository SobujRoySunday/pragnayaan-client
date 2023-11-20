import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

export default function DevDashboard() {
  return (
    <div className='grid grid-cols-[1fr_5fr]'>
      <div>
        <Sidebar />
      </div>
      <main className='w-full'>
        <Topbar />
        Hi
      </main>
    </div>
  )
}
