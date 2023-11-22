import Topbar from './Topbar'
import Sidebar from './Sidebar'

export default function DashboardLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className='grid grid-cols-[1fr_5fr]'>
      <div>
        <Sidebar />
      </div>
      <main className='w-full'>
        <Topbar />
        {children}
      </main>
    </div>
  )
}
