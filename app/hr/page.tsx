import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HRDashboard() {
  const modules = [
    { name: "Documentation", link: "/hr/documentation", description: "Manage company documents" },
    { name: "Attendance", link: "/hr/attendance", description: "Track employee attendance" },
    { name: "Leave Management", link: "/hr/leave", description: "Manage employee leaves" },
    { name: "Employee Database", link: "/hr/employees", description: "Access employee information" },
    { name: "Payroll", link: "/hr/payroll", description: "Manage employee salaries" },
    { name: "Compliances", link: "/hr/compliances", description: "Ensure regulatory compliance" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">HR Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.name}>
            <CardHeader>
              <CardTitle>{module.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{module.description}</p>
              <Link href={module.link} className="text-blue-600 hover:underline">
                Go to {module.name}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

