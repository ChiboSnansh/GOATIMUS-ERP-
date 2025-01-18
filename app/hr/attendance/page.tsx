'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, employee: "John Doe", date: "2023-06-01", checkIn: "09:00", checkOut: "17:00" },
    { id: 2, employee: "Jane Smith", date: "2023-06-01", checkIn: "08:45", checkOut: "17:15" },
    { id: 3, employee: "Bob Johnson", date: "2023-06-01", checkIn: "09:15", checkOut: "17:30" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [newAttendance, setNewAttendance] = useState({ employee: "", date: "", checkIn: "", checkOut: "" })
  const [editingAttendance, setEditingAttendance] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAttendance(prev => ({ ...prev, [name]: value }))
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditingAttendance(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRecord = {
      id: attendanceRecords.length + 1,
      ...newAttendance
    }
    setAttendanceRecords(prev => [...prev, newRecord])
    setIsOpen(false)
    setNewAttendance({ employee: "", date: "", checkIn: "", checkOut: "" })
  }

  const handleEdit = (record) => {
    setEditingAttendance(record)
    setIsEditOpen(true)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setAttendanceRecords(prev => 
      prev.map(item => 
        item.id === editingAttendance.id ? editingAttendance : item
      )
    )
    setIsEditOpen(false)
    setEditingAttendance(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Record Attendance</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Attendance</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="employee">Employee Name</Label>
                <Input id="employee" name="employee" value={newAttendance.employee} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={newAttendance.date} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="checkIn">Check In Time</Label>
                <Input id="checkIn" name="checkIn" type="time" value={newAttendance.checkIn} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="checkOut">Check Out Time</Label>
                <Input id="checkOut" name="checkOut" type="time" value={newAttendance.checkOut} onChange={handleInputChange} required />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.employee}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.checkIn}</TableCell>
              <TableCell>{record.checkOut}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(record)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Attendance</DialogTitle>
          </DialogHeader>
          {editingAttendance && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="editEmployee">Employee Name</Label>
                <Input id="editEmployee" name="employee" value={editingAttendance.employee} onChange={handleEditInputChange} required />
              </div>
              <div>
                <Label htmlFor="editDate">Date</Label>
                <Input id="editDate" name="date" type="date" value={editingAttendance.date} onChange={handleEditInputChange} required />
              </div>
              <div>
                <Label htmlFor="editCheckIn">Check In Time</Label>
                <Input id="editCheckIn" name="checkIn" type="time" value={editingAttendance.checkIn} onChange={handleEditInputChange} required />
              </div>
              <div>
                <Label htmlFor="editCheckOut">Check Out Time</Label>
                <Input id="editCheckOut" name="checkOut" type="time" value={editingAttendance.checkOut} onChange={handleEditInputChange} required />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

