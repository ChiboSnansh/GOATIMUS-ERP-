'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Compliances() {
  const [complianceRecords, setComplianceRecords] = useState([
    { id: 1, name: "Annual Tax Filing", dueDate: "2023-12-31", status: "Pending" },
    { id: 2, name: "Employee Benefits Renewal", dueDate: "2023-09-30", status: "In Progress" },
    { id: 3, name: "Workplace Safety Inspection", dueDate: "2023-08-15", status: "Completed" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [newCompliance, setNewCompliance] = useState({ name: "", dueDate: "", status: "" })
  const [updatingCompliance, setUpdatingCompliance] = useState(null)
  const [viewingCompliance, setViewingCompliance] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCompliance(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target
    setUpdatingCompliance(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRecord = {
      id: complianceRecords.length + 1,
      ...newCompliance
    }
    setComplianceRecords(prev => [...prev, newRecord])
    setIsOpen(false)
    setNewCompliance({ name: "", dueDate: "", status: "" })
  }

  const handleUpdate = (record) => {
    setUpdatingCompliance(record)
    setIsUpdateOpen(true)
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    setComplianceRecords(prev => 
      prev.map(item => 
        item.id === updatingCompliance.id ? updatingCompliance : item
      )
    )
    setIsUpdateOpen(false)
    setUpdatingCompliance(null)
  }

  const handleView = (record) => {
    setViewingCompliance(record)
    setIsViewOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliances</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Compliance Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Compliance Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Compliance Name</Label>
                <Input id="name" name="name" value={newCompliance.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" value={newCompliance.dueDate} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" value={newCompliance.status} onValueChange={(value) => setNewCompliance(prev => ({ ...prev, status: value }))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add Task</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Compliance Name</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complianceRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.dueDate}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleUpdate(record)}>Update</Button>
                <Button variant="outline" size="sm" onClick={() => handleView(record)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Compliance Task</DialogTitle>
          </DialogHeader>
          {updatingCompliance && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <Label htmlFor="updateName">Compliance Name</Label>
                <Input id="updateName" name="name" value={updatingCompliance.name} onChange={handleUpdateInputChange} required />
              </div>
              <div>
                <Label htmlFor="updateDueDate">Due Date</Label>
                <Input id="updateDueDate" name="dueDate" type="date" value={updatingCompliance.dueDate} onChange={handleUpdateInputChange} required />
              </div>
              <div>
                <Label htmlFor="updateStatus">Status</Label>
                <Select name="status" value={updatingCompliance.status} onValueChange={(value) => setUpdatingCompliance(prev => ({ ...prev, status: value }))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Compliance Task</DialogTitle>
          </DialogHeader>
          {viewingCompliance && (
            <div className="space-y-4">
              <div>
                <Label>Compliance Name</Label>
                <p className="mt-1">{viewingCompliance.name}</p>
              </div>
              <div>
                <Label>Due Date</Label>
                <p className="mt-1">{viewingCompliance.dueDate}</p>
              </div>
              <div>
                <Label>Status</Label>
                <p className="mt-1">{viewingCompliance.status}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

