import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Payroll() {
  const payrollRecords = [
    { id: 1, employee: "John Doe", salary: "$5000", bonus: "$500", deductions: "$200", netPay: "$5300" },
    { id: 2, employee: "Jane Smith", salary: "$6000", bonus: "$600", deductions: "$250", netPay: "$6350" },
    { id: 3, employee: "Bob Johnson", salary: "$5500", bonus: "$550", deductions: "$220", netPay: "$5830" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payroll</h1>
        <Button>Generate Payroll</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Bonus</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.employee}</TableCell>
              <TableCell>{record.salary}</TableCell>
              <TableCell>{record.bonus}</TableCell>
              <TableCell>{record.deductions}</TableCell>
              <TableCell>{record.netPay}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

