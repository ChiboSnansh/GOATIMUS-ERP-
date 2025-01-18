'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: "John Doe", type: "Vacation", startDate: "2023-07-01", endDate: "2023-07-05", status: "Pending" },
    { id: 2, employee: "Jane Smith", type: "Sick Leave", startDate: "2023-06-15", endDate: "2023-06-16", status: "Approved" },
    { id: 3, employee: "Bob Johnson", type: "Personal", startDate: "2023-06-20", endDate: "2023-06-21", status: "Rejected" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newLeave, setNewLeave] = useState({
    employee: "",
    type: "",
    startDate: "",
    endDate: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewLeave(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setNewLeave(prev => ({ ...prev, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRequest = {
      id: leaveRequests.length + 1,
      ...newLeave,
      status: "Pending"
    }
    setLeaveRequests(prev => [...prev, newRequest])
    setIsOpen(false)
    setNewLeave({ employee: "", type: "", startDate: "", endDate: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Request Leave</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="employee">Employee Name</Label>
                <Input id="employee" name="employee" value={newLeave.employee} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="type">Leave Type</Label>
                <Select name="type" value={newLeave.type} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vacation">Vacation</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={newLeave.startDate} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={newLeave.endDate} onChange={handleInputChange} required />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.employee}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2" 
                  onClick={() => {
                    setLeaveRequests(prev => 
                      prev.map(item => 
                        item.id === request.id ? {...item, status: "Approved"} : item
                      )
                    )
                  }}
                >
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setLeaveRequests(prev => 
                      prev.map(item => 
                        item.id === request.id ? {...item, status: "Rejected"} : item
                      )
                    )
                  }}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

