import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function InventoryReports() {
  // Mock data for reports
  const reports = [
    { title: 'Low Stock Items', value: 5 },
    { title: 'Total Inventory Value', value: '$125,000' },
    { title: 'Items Out of Stock', value: 2 },
    { title: 'Most Popular Item', value: 'Laptop' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Reports</h1>
        <Link href="/inventory" passHref>
          <Button variant="outline">Back to Inventory</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{report.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

