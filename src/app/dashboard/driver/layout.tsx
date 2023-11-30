import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

export default function DriverDashboardLayout({ children }: {
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
