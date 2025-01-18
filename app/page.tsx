import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const salesData = [
    { name: 'Leads', value: 150, color: '#22c55e' },
    { name: 'Opportunities', value: 45, color: '#eab308' },
    { name: 'Closed Deals', value: 22, color: '#3b82f6' },
  ]

  const recentActivity = [
    { id: 1, description: "New lead added: John Doe from ABC Corp", timestamp: "2 hours ago" },
    { id: 2, description: "Opportunity stage updated: XYZ Project moved to Negotiation", timestamp: "4 hours ago" },
    { id: 3, description: "Deal closed: $50,000 with 123 Industries", timestamp: "1 day ago" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Leads" value="150" link="/leads" status="success" />
        <DashboardCard title="Open Opportunities" value="45" link="/opportunities" status="warning" />
        <DashboardCard title="Closed Deals" value="22" link="/deals" status="info" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="text-sm">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-muted-foreground">{activity.timestamp}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, link, status }: { title: string, value: string, link: string, status: 'success' | 'warning' | 'info' | 'error' }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <Progress value={33} className="mt-2" />
        <Link href={link} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}

