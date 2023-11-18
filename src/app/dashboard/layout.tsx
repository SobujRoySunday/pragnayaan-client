import DashboardNav from "@/components/DashboardNav"

export default function layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  )
}
