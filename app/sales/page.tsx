import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from an API connected to the HR module
const salesPersons = [
  { id: 1, name: "Ravi A", employeeId: "EMP001", totalSales: 11250000 },
  { id: 2, name: "Rudrajeet", employeeId: "EMP002", totalSales: 15000000 },
  { id: 3, name: "Pradeep", employeeId: "EMP003", totalSales: 13500000 },
]

export default function SalesModule() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales Module</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage and track potential sales opportunities and accounts.</p>
            <Link href="/sales/opportunities">
              <Button>View Opportunities</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">View sales performance and analytics.</p>
            <Link href="/sales/reports">
              <Button>View Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Team</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesPersons.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.employeeId}</TableCell>
                  <TableCell>₹{person.totalSales.toLocaleString()}</TableCell>
                  <TableCell>
                    <Link href={`/sales/person/${person.id}`}>
                      <Button variant="link">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

